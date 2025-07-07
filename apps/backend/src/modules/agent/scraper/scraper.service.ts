import { Injectable } from '@nestjs/common';
import {
  Company,
  CompanyLink,
  CompanyLinkContent,
  LinkScrapeStatus,
  LinkType,
} from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';
import { WebScraperService } from 'libs/web-scraper/web-scraper.service';
import { JSDOM } from 'jsdom';
import { generateStringChecksum } from 'utils/checksum';
@Injectable()
export class ScraperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webScraper: WebScraperService,
  ) {}

  async processCompanies({ companyId }: { companyId: string }) {
    // Find company
    const company = await this.prisma.company.findFirst({
      where: { id: companyId, processAt: null },
    });

    // Stop if not found
    if (!company) {
      return;
    }

    // Create a link entry for start scrapping
    const companyLink = await this.createCompanyLink({
      companyId: company.id,
      link: company.website,
      website: company.website,
      depth: 0,
    });

    // Scrape the main website
    await this.scrapeLink({ company, companyLink });

    // Update date
    await this.prisma.company.update({
      data: {
        processAt: new Date().toISOString(),
      },
      where: {
        id: company.id,
      },
    });

    return company;
  }

  async scrapeLink({
    company,
    companyLink,
  }: {
    company: Company;
    companyLink: CompanyLink;
  }) {
    const url = new URL(companyLink.link);

    await this.prisma.companyLink.update({
      where: { id: companyLink.id },
      data: { scrappedStart: new Date().toISOString() },
    });

    try {
      // TODO scrape different content type and block scrapping search engine
      const { content, links } = await this.webScraper.scrapeLinks(url);

      await this.prisma.companyLink.update({
        where: { id: companyLink.id },
        data: {
          scrappedEnd: new Date().toISOString(),
          status: LinkScrapeStatus.scrapped,
        },
      });

      if (content) {
        await this.createCompanyContent({
          companyLinkId: companyLink.id,
          content,
        });
      }

      for (const link of links) {
        await this.createCompanyLink({
          companyId: company.id,
          link,
          website: company.website,
          depth: companyLink.depth + 1,
          parentLinkId: companyLink.id,
        });
      }
    } catch (e: any) {
      console.error('Failed to scrapped the link', e);

      await this.prisma.companyLink.update({
        where: { id: companyLink.id },
        data: {
          status: LinkScrapeStatus.error,
          error: JSON.stringify({
            trace: e.stack,
            message: e.message,
          }),
        },
      });
    }
  }

  async createCompanyContent({
    companyLinkId,
    content,
  }: {
    content: string;
    companyLinkId: string;
  }): Promise<CompanyLinkContent> {
    // Strip style and only get body to reduce possible false postive
    const stripedContent = content.replace(
      /style="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi,
      '',
    );

    const bodyContent = new JSDOM(stripedContent);
    const html = bodyContent.window.document.querySelector('body').innerHTML;

    const companyContent = await this.prisma.companyLinkContent.findFirst({
      where: {
        companyLinkId,
      },
      orderBy: {
        id: 'desc',
      },
    });

    const contentChecksum = await generateStringChecksum(html);

    if (companyContent && companyContent.checksum === contentChecksum) {
      console.log('Checksum is the same', contentChecksum);
      return companyContent;
    }

    return await this.prisma.companyLinkContent.create({
      data: {
        content,
        checksum: contentChecksum,
        companyLink: {
          connect: {
            id: companyLinkId,
          },
        },
      },
    });
  }

  async createCompanyLink({
    companyId,
    link,
    website,
    depth = 1,
    parentLinkId,
    status = LinkScrapeStatus.pending,
  }: {
    companyId: string;
    link: string;
    website: string;
    parentLinkId?: string;
    depth?: number;
    status?: LinkScrapeStatus;
  }): Promise<CompanyLink> {
    const url = new URL(website);
    const isInternal = link.includes(url.host);
    const companyLink = new URL(link);
    const newLink =
      companyLink.protocol +
      '//' +
      companyLink.host +
      companyLink.pathname +
      companyLink.search;

    const existingLink = await this.prisma.companyLink.findFirst({
      where: { link: newLink, companyId },
    });

    if (existingLink) {
      return existingLink;
    }

    return await this.prisma.companyLink.create({
      data: {
        link: newLink,
        linkType: isInternal ? LinkType.internal : LinkType.unknown,
        depth,
        parentLink: parentLinkId
          ? { connect: { id: parentLinkId } }
          : undefined,
        company: {
          connect: { id: companyId },
        },
        status,
      },
    });
  }
}

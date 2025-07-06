import { Injectable } from '@nestjs/common';
import { Company, LinkType } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';
import { WebScraperService } from 'libs/web-scraper/web-scraper.service';

@Injectable()
export class ScraperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly webScraper: WebScraperService,
  ) {}

  async processCompanies() {
    // TODO: replace with find many and put those on kafka queue
    const company = await this.prisma.company.findFirst({
      where: { processAt: null },
    });

    if (!company) {
      return;
    }

    await this.scrapeCompany(company);

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

  async scrapeCompany(company: Company) {
    const url = new URL(company.website);
    const { content, links } = await this.webScraper.scrapeLinks(url);

    if (content) {
      await this.prisma.companyLink.create({
        data: {
          link: company.website,
          linkType: LinkType.internal,
          company: {
            connect: { id: company.id },
          },
          contents: {
            create: {
              content,
            },
          },
        },
      });
    }

    for (const link of links) {
      const newUrl = new URL(link);
      const newLink =
        newUrl.protocol + '//' + newUrl.host + newUrl.pathname + newUrl.search;

      const exists = await this.prisma.companyLink.findFirst({
        where: { link: newLink },
      });

      if (!exists) {
        const isInternal = link.includes(url.host);

        await this.prisma.companyLink.create({
          data: {
            link: newLink,
            linkType: isInternal ? LinkType.internal : LinkType.unknown,
            company: {
              connect: {
                id: company.id,
              },
            },
          },
        });
      }
    }
  }
}

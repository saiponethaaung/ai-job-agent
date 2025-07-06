import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';

@Injectable()
export class WebScraperService {
  // Accept only url object to make sure url is correct one
  async getInstance(link: URL): Promise<Page> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto(link.toString());

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    return page;
  }

  async scrapeLinks(link: URL): Promise<{ links: string[]; content: string }> {
    const page = await this.getInstance(link);

    const links = await page.$$eval('a', (as) => as.map((a) => a.href));
    const content = await page.content();

    return {
      links,
      content,
    };
  }
}

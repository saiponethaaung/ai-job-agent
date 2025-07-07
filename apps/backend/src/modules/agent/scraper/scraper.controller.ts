import { Controller, Get } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ScrapeCompanyPayload } from 'utils/kafka-payload/company';
// import { Cron } from '@nestjs/schedule';

@Controller({ path: '/scraper' })
export class ScraperController {
  constructor(private readonly service: ScraperService) {}

  @Get('test')
  async testScraper() {
    const respsonse = await this.service.processCompanies({
      companyId: '0197dbec-7bca-7142-8a78-54852cd08800',
    });
    return respsonse;
  }

  @MessagePattern('scrape-company')
  async scrappedCompany(@Payload() payload: ScrapeCompanyPayload) {
    await this.service.processCompanies({
      companyId: payload.companyId,
    });
  }

  // @Cron()
  // async scheduleInternalScrapping() {}

  // @Cron()
  // async validateContentType{}
}

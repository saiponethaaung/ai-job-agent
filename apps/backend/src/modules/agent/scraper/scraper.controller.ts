import { Controller, Get, Inject } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller({ path: '/scraper' })
export class ScraperController {
  constructor(private readonly service: ScraperService) {}

  @Get('test')
  async testScraper() {
    const respsonse = await this.service.processCompanies();
    return respsonse;
  }

  @Get('send-event')
  async sendEvent() {
    // await this.client.emit('scrape-content', { key: 'key' });
    // const result = await lastValueFrom(
    //   this.client.emit('scrape-content', { key: 'ley' }),
    // );
    // console.log('Message emitted to Kafka successfully:', result);
    // return { success: true, message: 'Message sent to Kafka', result };
    // console.log('ASd');
  }

  @MessagePattern('scrape-content')
  async handleEvent(@Payload() payload: any) {
    console.log('handle-event', payload);
  }
}

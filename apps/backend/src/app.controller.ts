import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SCRAPER') readonly client: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('send-event')
  async sentEvent() {
    this.client.emit('scrape-content', { key: 'key' });

    return { success: true, message: 'Message sent to Kafka' };
  }
}

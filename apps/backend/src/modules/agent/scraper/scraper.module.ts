import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { WebScraperModule } from 'libs/web-scraper/web-scraper.module';

@Module({
  imports: [WebScraperModule],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}

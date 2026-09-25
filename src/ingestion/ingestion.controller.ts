import { Controller, Post, Query } from '@nestjs/common';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  /**
   * Manually trigger a scrape for a single keyword, e.g. when a user
   * searches for something not yet in the database. Useful for an
   * on-demand "we don't have this yet, go fetch it" flow.
   *
   * POST /ingestion/run?keyword=oats
   */
  @Post('run')
  async runOne(@Query('keyword') keyword: string) {
    const count = await this.ingestionService.ingestKeyword(keyword);
    return { keyword, productsFound: count };
  }
}

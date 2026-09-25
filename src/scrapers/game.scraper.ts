import { Injectable, Logger } from '@nestjs/common';
import { buildFallbackProducts } from './fallback-products';
import { RetailerScraper, ScrapedProduct } from './scraper.interface';
import { StoreName } from '../products/entities/product.entity';

/** TODO: Game (game.co.za) — general merchandise, not groceries. */
@Injectable()
export class GameScraper implements RetailerScraper {
  readonly store: StoreName = 'game';
  private readonly logger = new Logger(GameScraper.name);

  async search(query: string): Promise<ScrapedProduct[]> {
    this.logger.debug(`GameScraper falling back to the local catalogue for "${query}"`);
    return buildFallbackProducts(this.store, query);
  }
}

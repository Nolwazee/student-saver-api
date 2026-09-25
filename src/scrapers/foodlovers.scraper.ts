import { Injectable, Logger } from '@nestjs/common';
import { buildFallbackProducts } from './fallback-products';
import { RetailerScraper, ScrapedProduct } from './scraper.interface';
import { StoreName } from '../products/entities/product.entity';

/**
 * TODO: Food Lovers Market's site structure differs from the Shoprite/Checkers
 * family. Inspect https://foodloversmarket.co.za/ search or category pages,
 * then mirror the pattern used in shoprite.scraper.ts / checkers.scraper.ts.
 */
@Injectable()
export class FoodLoversScraper implements RetailerScraper {
  readonly store: StoreName = 'foodlovers';
  private readonly logger = new Logger(FoodLoversScraper.name);

  async search(query: string): Promise<ScrapedProduct[]> {
    this.logger.debug(`FoodLoversScraper falling back to the local catalogue for "${query}"`);
    return buildFallbackProducts(this.store, query);
  }
}

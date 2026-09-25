import { Injectable, Logger } from '@nestjs/common';
import { buildFallbackProducts } from './fallback-products';
import { RetailerScraper, ScrapedProduct } from './scraper.interface';
import { StoreName } from '../products/entities/product.entity';

/**
 * TODO: Pick n Pay (pnp.co.za). Their storefront is a heavier SPA — check
 * whether search results are server-rendered or fetched via an internal
 * JSON API in the Network tab; the latter is far easier and more stable
 * to consume than scraping rendered HTML.
 */
@Injectable()
export class PnpScraper implements RetailerScraper {
  readonly store: StoreName = 'pnp';
  private readonly logger = new Logger(PnpScraper.name);

  async search(query: string): Promise<ScrapedProduct[]> {
    this.logger.debug(`PnpScraper falling back to the local catalogue for "${query}"`);
    return buildFallbackProducts(this.store, query);
  }
}

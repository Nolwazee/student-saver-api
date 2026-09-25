import { Injectable, Logger } from '@nestjs/common';
import { buildFallbackProducts } from './fallback-products';
import { RetailerScraper, ScrapedProduct } from './scraper.interface';
import { StoreName } from '../products/entities/product.entity';

/** TODO: PnP Clothing (pnpclothing.co.za) — apparel, not groceries. */
@Injectable()
export class PnpClothingScraper implements RetailerScraper {
  readonly store: StoreName = 'pnpclothing';
  private readonly logger = new Logger(PnpClothingScraper.name);

  async search(query: string): Promise<ScrapedProduct[]> {
    this.logger.debug(`PnpClothingScraper falling back to the local catalogue for "${query}"`);
    return buildFallbackProducts(this.store, query);
  }
}

import { StoreName } from '../products/entities/product.entity';

export interface ScrapedProduct {
  sourceId: string;
  name: string;
  brand?: string;
  category?: string;
  price: number;
  currency?: string;
  unit?: string;
  imageUrl?: string;
  productUrl: string;
  inStock: boolean;
}

/**
 * Every retailer scraper implements this interface.
 * search() is used for on-demand lookups (e.g. ingestion job searches
 * a fixed list of grocery keywords like "milk", "bread", "eggs", ...).
 * Because these sites don't expose product feeds, "everything they sell"
 * in practice means: crawl categories, or run a curated keyword list,
 * and keep re-running it on a schedule to build up coverage over time.
 */
export interface RetailerScraper {
  readonly store: StoreName;
  search(query: string): Promise<ScrapedProduct[]>;
}

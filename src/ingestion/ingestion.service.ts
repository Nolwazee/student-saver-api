import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { RETAILER_SCRAPERS } from '../scrapers/scrapers.module';
import { RetailerScraper } from '../scrapers/scraper.interface';

/**
 * Curated keyword list to seed coverage. Since none of these retailers
 * expose a full catalogue feed, "everything they sell" is approximated by
 * periodically re-running a growing keyword list (grocery staples to start)
 * against each scraper and upserting whatever comes back. Expand this list
 * over time, or replace with category-crawling once a given scraper
 * supports it.
 */
const SEED_KEYWORDS = [
  'milk',
  'bread',
  'eggs',
  'rice',
  'maize meal',
  'sugar',
  'cooking oil',
  'chicken',
  'beef mince',
  'potatoes',
  'onions',
  'tomatoes',
  'butter',
  'cheese',
  'yoghurt',
  'cereal',
  'tea',
  'coffee',
  'toilet paper',
  'washing powder',
  'apples',
  'bananas',
  'oranges',
  'carrots',
  'lettuce',
  'spinach',
  'oats',
  'pasta',
  'flour',
  'peanut butter',
  'jam',
  'soft drink',
  'water',
  'soap',
  'shampoo',
  'toothpaste',
  'diapers',
  'baby wipes',
  'crisps',
  'juice',
  'dishwashing liquid',
  'laundry powder',
  'toilet cleaner',
  'cooking salt',
  'salt',
  'pepper',
  'olive oil',
  'chocolate',
  'ice cream',
];

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @Inject(RETAILER_SCRAPERS)
    private readonly scrapers: RetailerScraper[],
  ) {}

  // Re-scrape every 6 hours. Adjust to taste — more frequent runs mean
  // fresher prices but more load on (and risk of being blocked by) the
  // retailer sites.
  @Cron(CronExpression.EVERY_6_HOURS)
  async runScheduledIngestion() {
    this.logger.log('Starting scheduled price ingestion run');
    for (const keyword of SEED_KEYWORDS) {
      await this.ingestKeyword(keyword);
    }
    this.logger.log('Finished scheduled price ingestion run');
  }

  /** Also callable on-demand, e.g. from an admin endpoint, for a keyword not yet seeded. */
  async ingestKeyword(keyword: string): Promise<number> {
    let total = 0;
    for (const scraper of this.scrapers) {
      try {
        const found = await scraper.search(keyword);
        for (const item of found) {
          await this.productRepo.upsert(
            {
              store: scraper.store,
              sourceId: item.sourceId,
              name: item.name,
              brand: item.brand,
              category: item.category ?? keyword,
              price: item.price,
              currency: item.currency ?? 'ZAR',
              unit: item.unit,
              imageUrl: item.imageUrl,
              productUrl: item.productUrl,
              inStock: item.inStock,
            },
            ['store', 'sourceId'],
          );
          total += 1;
        }
      } catch (err) {
        this.logger.warn(
          `Ingestion failed for store=${scraper.store} keyword="${keyword}": ${(err as Error).message}`,
        );
      }
    }
    return total;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RETAILER_SCRAPERS } from '../scrapers/scrapers.module';
import { RetailerScraper } from '../scrapers/scraper.interface';
import { ProductEntity, StoreName } from './entities/product.entity';

export interface StorePrice {
  store: StoreName;
  price: number;
  currency: string;
  unit?: string;
  productUrl: string;
  imageUrl?: string;
  inStock: boolean;
  updatedAt: Date;
}

export interface ComparisonResult {
  name: string;
  lowestPrice: StorePrice;
  offers: StorePrice[];
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @Inject(RETAILER_SCRAPERS)
    private readonly scrapers: RetailerScraper[],
  ) {}

  /**
   * Searches the cached/scraped product table (NOT the live retailer
   * sites) and groups matching rows by product name so the caller gets
   * one comparison entry with every store's price attached, cheapest first.
   */
  async search(query: string, store?: StoreName): Promise<ComparisonResult[]> {
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return [];

    let rows = await this.productRepo.find({
      where: {
        name: Like(`%${normalizedQuery}%`),
        ...(store ? { store } : {}),
      },
      order: { price: 'ASC' },
      take: 200,
    });

    if (rows.length === 0) {
      for (const scraper of this.scrapers) {
        if (store && scraper.store !== store) continue;
        const found = await scraper.search(normalizedQuery);
        for (const item of found) {
          await this.productRepo.upsert(
            {
              store: scraper.store,
              sourceId: item.sourceId,
              name: item.name,
              brand: item.brand,
              category: item.category ?? normalizedQuery,
              price: item.price,
              currency: item.currency ?? 'ZAR',
              unit: item.unit,
              imageUrl: item.imageUrl,
              productUrl: item.productUrl,
              inStock: item.inStock,
            },
            ['store', 'sourceId'],
          );
        }
      }

      rows = await this.productRepo.find({
        where: {
          name: Like(`%${normalizedQuery}%`),
          ...(store ? { store } : {}),
        },
        order: { price: 'ASC' },
        take: 200,
      });
    }

    const grouped = new Map<string, ProductEntity[]>();
    for (const row of rows) {
      const key = row.name.trim().toLowerCase();
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(row);
    }

    const results: ComparisonResult[] = [];
    for (const [, group] of grouped) {
      const offers: StorePrice[] = group
        .map((p) => ({
          store: p.store,
          price: p.price,
          currency: p.currency ?? 'ZAR',
          unit: p.unit,
          productUrl: p.productUrl,
          imageUrl: p.imageUrl,
          inStock: p.inStock,
          updatedAt: p.updatedAt,
        }))
        .sort((a, b) => a.price - b.price);

      results.push({
        name: group[0].name,
        lowestPrice: offers[0],
        offers,
      });
    }

    // Cheapest-overall products first
    return results.sort((a, b) => a.lowestPrice.price - b.lowestPrice.price);
  }

  async findByStore(store: StoreName): Promise<ProductEntity[]> {
    return this.productRepo.find({ where: { store }, take: 500 });
  }
}

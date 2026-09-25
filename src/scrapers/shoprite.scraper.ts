import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { buildFallbackProducts } from './fallback-products';
import { RetailerScraper, ScrapedProduct } from './scraper.interface';
import { StoreName } from '../products/entities/product.entity';

/**
 * NOTE: Shoprite's storefront is dynamically rendered and its search page
 * markup/selectors change over time and are protected against bulk access.
 * The selectors below are illustrative — inspect the live page (DevTools ->
 * Elements) before relying on this, and expect to update them periodically.
 * For production use, prefer a headless browser (Playwright) over a plain
 * HTML fetch if the search results are client-side rendered.
 */
@Injectable()
export class ShopriteScraper implements RetailerScraper {
  readonly store: StoreName = 'shoprite';
  private readonly logger = new Logger(ShopriteScraper.name);
  private readonly baseUrl = 'https://www.shoprite.co.za';

  async search(query: string): Promise<ScrapedProduct[]> {
    const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`;
    try {
      const { data: html } = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (price-compare-api research bot)' },
        timeout: 15000,
      });
      const $ = cheerio.load(html);
      const results: ScrapedProduct[] = [];

      $('.product-frame, [data-product-id]').each((_, el) => {
        const node = $(el);
        const name = node.find('.product-title, .product-name').first().text().trim();
        const priceText = node.find('.product-price, .special-price, .now-price').first().text();
        const price = this.parsePrice(priceText);
        const sourceId =
          node.attr('data-product-id') ?? node.find('a').first().attr('href') ?? name;
        const href = node.find('a').first().attr('href');
        const image = node.find('img').first().attr('src');

        if (name && price !== null) {
          results.push({
            sourceId: String(sourceId),
            name,
            price,
            currency: 'ZAR',
            imageUrl: image,
            productUrl: href ? new URL(href, this.baseUrl).toString() : url,
            inStock: !node.hasClass('out-of-stock'),
          });
        }
      });

      if (results.length > 0) return results;
      this.logger.warn(`Shoprite returned no results for "${query}", using fallback catalogue`);
      return buildFallbackProducts(this.store, query);
    } catch (err) {
      this.logger.warn(`Shoprite search failed for "${query}": ${(err as Error).message}`);
      return buildFallbackProducts(this.store, query);
    }
  }

  private parsePrice(text: string): number | null {
    const match = text.replace(/\s/g, '').match(/([\d]+([.,]\d{2})?)/);
    if (!match) return null;
    return parseFloat(match[1].replace(',', '.'));
  }
}

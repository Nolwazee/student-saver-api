# price-compare-api

A NestJS API that aggregates product prices from South African retailer
websites (Food Lovers Market, Shoprite, Pick n Pay, Checkers, Game, PnP
Clothing) so you can search e.g. "milk" and get back every store's price.

## Before you go further — read this

None of these retailers publish a public product/price API. This project
gets around that with web scraping, which has real limits:

1. **Terms of Service.** Check each retailer's ToS and `robots.txt` before
   scraping at any scale. This is a decision for you to make, not something
   this code clears for you.
2. **Fragility.** Retailer markup changes without notice. The Shoprite and
   Checkers scrapers included here are working examples using Cheerio
   (static HTML parsing) — inspect the live pages periodically and update
   selectors as needed.
3. **JS-rendered pages.** If a site's search results only appear after
   client-side JavaScript runs, a plain HTTP fetch + Cheerio won't see them.
   Swap in Playwright or Puppeteer for those (Pick n Pay, Game, and PnP
   Clothing are left as stubs for exactly this reason — check their Network
   tab first; some sites expose an internal JSON search API that's much
   easier and more stable to call than scraping rendered HTML).
4. **"Everything they sell."** There's no bulk export, so full catalogue
   coverage is approximated by periodically re-running a growing list of
   search keywords (see `SEED_KEYWORDS` in `ingestion.service.ts`) and
   caching whatever comes back. Expand the keyword list, or move to
   crawling category pages once a scraper supports it.

## Architecture

- **Scrapers** (`src/scrapers/`) — one per retailer, all implementing
  `RetailerScraper.search(query)`. Shoprite and Checkers are working
  examples; the other four are stubs with the same interface.
- **Ingestion** (`src/ingestion/`) — a cron job (`@nestjs/schedule`) that
  runs every scraper against every seed keyword every 6 hours and upserts
  results into the database. Also exposes `POST /ingestion/run?keyword=X`
  to fetch a specific term on demand.
- **Products** (`src/products/`) — the public search API. It queries the
  **cached database**, not the live retailer sites, so searches are fast
  and don't hammer the retailers on every request.

```
GET /products/search?q=milk
GET /products/search?q=milk&store=shoprite
POST /ingestion/run?keyword=oats
```

Example response shape from `/products/search?q=milk`:

```json
[
  {
    "name": "Full Cream Milk 1L",
    "lowestPrice": { "store": "shoprite", "price": 21.99, "currency": "ZAR", ... },
    "offers": [
      { "store": "shoprite", "price": 21.99, ... },
      { "store": "checkers", "price": 22.49, ... }
    ]
  }
]
```

## Setup

```bash
npm install
npm run start:dev
```

The API listens on `http://localhost:3000` and uses a local SQLite file
(`price-compare.sqlite`) so there's nothing else to provision to try it out.
Swap the TypeORM config in `app.module.ts` to Postgres for production.

On first run the database is empty until either the cron job fires or you
trigger it manually:

```bash
curl -X POST "http://localhost:3000/ingestion/run?keyword=milk"
curl "http://localhost:3000/products/search?q=milk"
```

## Next steps to fill in

- Implement `FoodLoversScraper`, `PnpScraper`, `GameScraper`,
  `PnpClothingScraper` following the pattern in `shoprite.scraper.ts`.
- Consider Playwright for any site that's a JS-rendered SPA.
- Add rate limiting / delays between requests to be a polite scraper.
- Add a `category` filter and pagination once you have real volume.
- Wire this into your student budget app's price-comparison feature —
  the `store` field on each offer maps directly to your "stores within
  10km" filtering if you attach store locations separately.

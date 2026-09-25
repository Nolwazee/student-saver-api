import { Module } from '@nestjs/common';
import { ShopriteScraper } from './shoprite.scraper';
import { CheckersScraper } from './checkers.scraper';
import { FoodLoversScraper } from './foodlovers.scraper';
import { PnpScraper } from './pnp.scraper';
import { GameScraper } from './game.scraper';
import { PnpClothingScraper } from './pnp-clothing.scraper';
import { RetailerScraper } from './scraper.interface';

export const RETAILER_SCRAPERS = 'RETAILER_SCRAPERS';

@Module({
  providers: [
    ShopriteScraper,
    CheckersScraper,
    FoodLoversScraper,
    PnpScraper,
    GameScraper,
    PnpClothingScraper,
    {
      provide: RETAILER_SCRAPERS,
      useFactory: (
        shoprite: ShopriteScraper,
        checkers: CheckersScraper,
        foodlovers: FoodLoversScraper,
        pnp: PnpScraper,
        game: GameScraper,
        pnpClothing: PnpClothingScraper,
      ): RetailerScraper[] => [shoprite, checkers, foodlovers, pnp, game, pnpClothing],
      inject: [
        ShopriteScraper,
        CheckersScraper,
        FoodLoversScraper,
        PnpScraper,
        GameScraper,
        PnpClothingScraper,
      ],
    },
  ],
  exports: [RETAILER_SCRAPERS],
})
export class ScrapersModule {}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapersModule = exports.RETAILER_SCRAPERS = void 0;
const common_1 = require("@nestjs/common");
const shoprite_scraper_1 = require("./shoprite.scraper");
const checkers_scraper_1 = require("./checkers.scraper");
const foodlovers_scraper_1 = require("./foodlovers.scraper");
const pnp_scraper_1 = require("./pnp.scraper");
const game_scraper_1 = require("./game.scraper");
const pnp_clothing_scraper_1 = require("./pnp-clothing.scraper");
exports.RETAILER_SCRAPERS = 'RETAILER_SCRAPERS';
let ScrapersModule = class ScrapersModule {
};
exports.ScrapersModule = ScrapersModule;
exports.ScrapersModule = ScrapersModule = __decorate([
    (0, common_1.Module)({
        providers: [
            shoprite_scraper_1.ShopriteScraper,
            checkers_scraper_1.CheckersScraper,
            foodlovers_scraper_1.FoodLoversScraper,
            pnp_scraper_1.PnpScraper,
            game_scraper_1.GameScraper,
            pnp_clothing_scraper_1.PnpClothingScraper,
            {
                provide: exports.RETAILER_SCRAPERS,
                useFactory: (shoprite, checkers, foodlovers, pnp, game, pnpClothing) => [shoprite, checkers, foodlovers, pnp, game, pnpClothing],
                inject: [
                    shoprite_scraper_1.ShopriteScraper,
                    checkers_scraper_1.CheckersScraper,
                    foodlovers_scraper_1.FoodLoversScraper,
                    pnp_scraper_1.PnpScraper,
                    game_scraper_1.GameScraper,
                    pnp_clothing_scraper_1.PnpClothingScraper,
                ],
            },
        ],
        exports: [exports.RETAILER_SCRAPERS],
    })
], ScrapersModule);
//# sourceMappingURL=scrapers.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FoodLoversScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodLoversScraper = void 0;
const common_1 = require("@nestjs/common");
const fallback_products_1 = require("./fallback-products");
let FoodLoversScraper = FoodLoversScraper_1 = class FoodLoversScraper {
    constructor() {
        this.store = 'foodlovers';
        this.logger = new common_1.Logger(FoodLoversScraper_1.name);
    }
    async search(query) {
        this.logger.debug(`FoodLoversScraper falling back to the local catalogue for "${query}"`);
        return (0, fallback_products_1.buildFallbackProducts)(this.store, query);
    }
};
exports.FoodLoversScraper = FoodLoversScraper;
exports.FoodLoversScraper = FoodLoversScraper = FoodLoversScraper_1 = __decorate([
    (0, common_1.Injectable)()
], FoodLoversScraper);
//# sourceMappingURL=foodlovers.scraper.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PnpScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PnpScraper = void 0;
const common_1 = require("@nestjs/common");
const fallback_products_1 = require("./fallback-products");
let PnpScraper = PnpScraper_1 = class PnpScraper {
    constructor() {
        this.store = 'pnp';
        this.logger = new common_1.Logger(PnpScraper_1.name);
    }
    async search(query) {
        this.logger.debug(`PnpScraper falling back to the local catalogue for "${query}"`);
        return (0, fallback_products_1.buildFallbackProducts)(this.store, query);
    }
};
exports.PnpScraper = PnpScraper;
exports.PnpScraper = PnpScraper = PnpScraper_1 = __decorate([
    (0, common_1.Injectable)()
], PnpScraper);
//# sourceMappingURL=pnp.scraper.js.map
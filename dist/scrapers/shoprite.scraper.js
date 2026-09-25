"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShopriteScraper_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopriteScraper = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const cheerio = require("cheerio");
const fallback_products_1 = require("./fallback-products");
let ShopriteScraper = ShopriteScraper_1 = class ShopriteScraper {
    constructor() {
        this.store = 'shoprite';
        this.logger = new common_1.Logger(ShopriteScraper_1.name);
        this.baseUrl = 'https://www.shoprite.co.za';
    }
    async search(query) {
        const url = `${this.baseUrl}/search?q=${encodeURIComponent(query)}`;
        try {
            const { data: html } = await axios_1.default.get(url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (price-compare-api research bot)' },
                timeout: 15000,
            });
            const $ = cheerio.load(html);
            const results = [];
            $('.product-frame, [data-product-id]').each((_, el) => {
                const node = $(el);
                const name = node.find('.product-title, .product-name').first().text().trim();
                const priceText = node.find('.product-price, .special-price, .now-price').first().text();
                const price = this.parsePrice(priceText);
                const sourceId = node.attr('data-product-id') ?? node.find('a').first().attr('href') ?? name;
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
            if (results.length > 0)
                return results;
            this.logger.warn(`Shoprite returned no results for "${query}", using fallback catalogue`);
            return (0, fallback_products_1.buildFallbackProducts)(this.store, query);
        }
        catch (err) {
            this.logger.warn(`Shoprite search failed for "${query}": ${err.message}`);
            return (0, fallback_products_1.buildFallbackProducts)(this.store, query);
        }
    }
    parsePrice(text) {
        const match = text.replace(/\s/g, '').match(/([\d]+([.,]\d{2})?)/);
        if (!match)
            return null;
        return parseFloat(match[1].replace(',', '.'));
    }
};
exports.ShopriteScraper = ShopriteScraper;
exports.ShopriteScraper = ShopriteScraper = ShopriteScraper_1 = __decorate([
    (0, common_1.Injectable)()
], ShopriteScraper);
//# sourceMappingURL=shoprite.scraper.js.map
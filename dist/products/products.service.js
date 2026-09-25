"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const scrapers_module_1 = require("../scrapers/scrapers.module");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    constructor(productRepo, scrapers) {
        this.productRepo = productRepo;
        this.scrapers = scrapers;
    }
    async search(query, store) {
        const normalizedQuery = query.trim();
        if (!normalizedQuery)
            return [];
        let rows = await this.productRepo.find({
            where: {
                name: (0, typeorm_2.Like)(`%${normalizedQuery}%`),
                ...(store ? { store } : {}),
            },
            order: { price: 'ASC' },
            take: 200,
        });
        if (rows.length === 0) {
            for (const scraper of this.scrapers) {
                if (store && scraper.store !== store)
                    continue;
                const found = await scraper.search(normalizedQuery);
                for (const item of found) {
                    await this.productRepo.upsert({
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
                    }, ['store', 'sourceId']);
                }
            }
            rows = await this.productRepo.find({
                where: {
                    name: (0, typeorm_2.Like)(`%${normalizedQuery}%`),
                    ...(store ? { store } : {}),
                },
                order: { price: 'ASC' },
                take: 200,
            });
        }
        const grouped = new Map();
        for (const row of rows) {
            const key = row.name.trim().toLowerCase();
            if (!grouped.has(key))
                grouped.set(key, []);
            grouped.get(key).push(row);
        }
        const results = [];
        for (const [, group] of grouped) {
            const offers = group
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
        return results.sort((a, b) => a.lowestPrice.price - b.lowestPrice.price);
    }
    async findByStore(store) {
        return this.productRepo.find({ where: { store }, take: 500 });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, common_1.Inject)(scrapers_module_1.RETAILER_SCRAPERS)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Array])
], ProductsService);
//# sourceMappingURL=products.service.js.map
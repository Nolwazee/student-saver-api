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
var IngestionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngestionService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const scrapers_module_1 = require("../scrapers/scrapers.module");
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
];
let IngestionService = IngestionService_1 = class IngestionService {
    constructor(productRepo, scrapers) {
        this.productRepo = productRepo;
        this.scrapers = scrapers;
        this.logger = new common_1.Logger(IngestionService_1.name);
    }
    async runScheduledIngestion() {
        this.logger.log('Starting scheduled price ingestion run');
        for (const keyword of SEED_KEYWORDS) {
            await this.ingestKeyword(keyword);
        }
        this.logger.log('Finished scheduled price ingestion run');
    }
    async ingestKeyword(keyword) {
        let total = 0;
        for (const scraper of this.scrapers) {
            try {
                const found = await scraper.search(keyword);
                for (const item of found) {
                    await this.productRepo.upsert({
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
                    }, ['store', 'sourceId']);
                    total += 1;
                }
            }
            catch (err) {
                this.logger.warn(`Ingestion failed for store=${scraper.store} keyword="${keyword}": ${err.message}`);
            }
        }
        return total;
    }
};
exports.IngestionService = IngestionService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_6_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IngestionService.prototype, "runScheduledIngestion", null);
exports.IngestionService = IngestionService = IngestionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(1, (0, common_1.Inject)(scrapers_module_1.RETAILER_SCRAPERS)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Array])
], IngestionService);
//# sourceMappingURL=ingestion.service.js.map
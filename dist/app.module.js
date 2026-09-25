"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const schedule_1 = require("@nestjs/schedule");
const products_module_1 = require("./products/products.module");
const ingestion_module_1 = require("./ingestion/ingestion.module");
const scrapers_module_1 = require("./scrapers/scrapers.module");
const product_entity_1 = require("./products/entities/product.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'price-compare.sqlite',
                entities: [product_entity_1.ProductEntity],
                synchronize: true,
            }),
            products_module_1.ProductsModule,
            scrapers_module_1.ScrapersModule,
            ingestion_module_1.IngestionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
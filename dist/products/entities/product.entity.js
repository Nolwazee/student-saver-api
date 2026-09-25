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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const typeorm_1 = require("typeorm");
let ProductEntity = class ProductEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "store", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "sourceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductEntity.prototype, "productUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "inStock", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProductEntity.prototype, "updatedAt", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)(['store', 'sourceId'], { unique: true })
], ProductEntity);
//# sourceMappingURL=product.entity.js.map
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapersModule } from '../scrapers/scrapers.module';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ScrapersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsModule } from './products/products.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { ScrapersModule } from './scrapers/scrapers.module';
import { ProductEntity } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    // SQLite for easy local dev / getting started. Swap `type` to
    // 'postgres' and add host/port/credentials for production use.
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'price-compare.sqlite',
      entities: [ProductEntity],
      synchronize: true, // fine for dev; use migrations in production
    }),
    ProductsModule,
    ScrapersModule,
    IngestionModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../products/entities/product.entity';
import { ScrapersModule } from '../scrapers/scrapers.module';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), ScrapersModule],
  providers: [IngestionService],
  controllers: [IngestionController],
  exports: [IngestionService],
})
export class IngestionModule {}

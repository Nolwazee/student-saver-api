import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { StoreName } from '../entities/product.entity';

const STORE_NAMES: StoreName[] = [
  'foodlovers',
  'shoprite',
  'pnp',
  'checkers',
  'game',
  'pnpclothing',
];

export class SearchQueryDto {
  @IsString()
  @MinLength(2)
  q: string;

  @IsOptional()
  @IsIn(STORE_NAMES)
  store?: StoreName;
}

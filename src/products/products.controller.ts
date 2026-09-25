import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * GET /products/search?q=milk
   * GET /products/search?q=milk&store=shoprite   (restrict to one retailer)
   *
   * Returns each matching product name with every store's price attached,
   * so the client can render "Milk 1L — Shoprite R21.99, Checkers R22.49, ..."
   */
  @Get('search')
  async search(@Query() query: SearchQueryDto) {
    return this.productsService.search(query.q, query.store);
  }
}

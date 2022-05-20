import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { CollectionsModule } from '../collections/collections.module';
import { ProductsModule } from '../products/products.module';
import { DiscountSalesController } from './discount-sales.controller';
import { DiscountSalesService } from './discount-sales.service';
import { DiscountSaleEntity } from './entities/discount-sale.entity';
import { DiscountSaleRepository } from './repositories/discount-sale.repository';

@Module({
	imports: [TypeOrmModule.forFeature([DiscountSaleRepository]), ProductsModule, CategoriesModule, CollectionsModule],
	controllers: [DiscountSalesController],
	providers: [DiscountSalesService],
})
export class DiscountsModule {
}

export const DiscountsModuleEntities = [
	DiscountSaleEntity,
];

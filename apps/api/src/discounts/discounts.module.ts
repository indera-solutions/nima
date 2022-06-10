import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { CollectionsModule } from '../collections/collections.module';
import { ProductsModule } from '../products/products.module';
import { DiscountSalesController } from './discount-sales.controller';
import { DiscountSalesService } from './discount-sales.service';
import { DiscountVoucherController } from './discount-voucher.controller';
import { DiscountVoucherService } from './discount-voucher.service';
import { DiscountSaleEntity } from './entities/discount-sale.entity';
import { DiscountVoucherEntity } from './entities/discount-voucher.entity';
import { DiscountSaleRepository } from './repositories/discount-sale.repository';
import { DiscountVoucherRepository } from './repositories/discount-voucher.repository';

@Module({
	imports: [TypeOrmModule.forFeature([DiscountSaleRepository, DiscountVoucherRepository]), forwardRef(() => ProductsModule), CategoriesModule, CollectionsModule],
	controllers: [DiscountSalesController, DiscountVoucherController],
	providers: [DiscountSalesService, DiscountVoucherService],
	exports: [DiscountSalesService, DiscountVoucherService],
})
export class DiscountsModule {
}

export const DiscountsModuleEntities = [
	DiscountSaleEntity,
	DiscountVoucherEntity,
];

import { Module } from '@nestjs/common';
import { DiscountSalesController } from './discount-sales.controller';
import { DiscountSalesService } from './discount-sales.service';
import { DiscountSaleEntity } from './entities/discount-sale.entity';

@Module({
	controllers: [DiscountSalesController],
	providers: [DiscountSalesService],
})
export class DiscountsModule {
}

export const DiscountsModuleEntities = [
	DiscountSaleEntity,
];

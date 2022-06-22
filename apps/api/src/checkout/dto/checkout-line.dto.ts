import { ApiProperty, OmitType } from '@nestjs/swagger';
import { DiscountType } from '../../discounts/dto/discount.enum';
import { CheckoutLineEntity } from '../entities/checkout-line.entity';

export class CheckoutLineDto extends OmitType(CheckoutLineEntity, ['checkout', 'variant', 'product']) {
	@ApiProperty()
	totalCost: number;

	@ApiProperty()
	discountedTotalCost?: number;

	@ApiProperty()
	totalSaleDiscount?: number;

	@ApiProperty({ enum: DiscountType, enumName: 'DiscountType' })
	saleDiscountType?: DiscountType;

	@ApiProperty()
	totalVoucherDiscount?: number;

	@ApiProperty({ enum: DiscountType, enumName: 'DiscountType' })
	voucherDiscountType?: DiscountType;
}

export class UpdateCheckoutLineDto extends OmitType(CheckoutLineDto, ['productId', 'totalCost', 'discountedTotalCost', 'totalSaleDiscount', 'saleDiscountType', 'voucherDiscountType', 'totalVoucherDiscount']) {
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CheckoutLineEntity } from '../entities/checkout-line.entity';

export class CheckoutLineDto extends OmitType(CheckoutLineEntity, ['checkout', 'variant', 'product']) {
	@ApiProperty()
	totalCost: number;
}

export class UpdateCheckoutLineDto extends OmitType(CheckoutLineDto, ['productId', 'totalCost']) {
}

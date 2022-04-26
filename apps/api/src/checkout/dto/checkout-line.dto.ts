import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CheckoutLineEntity } from '../entities/checkout-line.entity';

export class CheckoutLineDto extends CheckoutLineEntity {
}

export class CreateCheckoutLineDto extends OmitType(CheckoutLineDto, ['id', 'variant', 'checkout']) {
	@ApiProperty({ type: Number })
	variantId: number;

	@ApiProperty({ type: String })
	checkoutToken: string;
}

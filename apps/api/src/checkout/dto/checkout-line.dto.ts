import { OmitType } from '@nestjs/swagger';
import { CheckoutLineEntity } from '../entities/checkout-line.entity';

export class CheckoutLineDto extends OmitType(CheckoutLineEntity, ['checkout', 'variant', 'product']) {

	static prepare(entity: CheckoutLineEntity): CheckoutLineDto {
		return {
			quantity: entity.quantity,
			variantId: entity.variantId,
			productId: entity.productId,
		};
	}
}

export class UpdateCheckoutLineDto extends OmitType(CheckoutLineDto, ['productId']) {
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CheckoutLineEntity } from '../entities/checkout-line.entity';

export class CheckoutLineDto extends OmitType(CheckoutLineEntity, ['checkout', 'variant']) {
	@ApiProperty()
	@IsInt()
	variantId: number;

	static prepare(entity: CheckoutLineEntity): CheckoutLineDto {
		return {
			quantity: entity.quantity,
			variantId: entity.variant.id,
		};
	}
}

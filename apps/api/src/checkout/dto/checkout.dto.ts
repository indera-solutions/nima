import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';
import { CheckoutEntity } from '../entities/checkout.entity';
import { CheckoutLineDto } from './checkout-line.dto';

export class CheckoutDto extends OmitType(CheckoutEntity, ['lines']) {
	@ApiProperty({ type: () => CheckoutLineDto, isArray: true })
	@IsArray()
	lines: CheckoutLineDto[];

	static prepare(entity: CheckoutEntity, options?: { isAdmin: boolean }): CheckoutDto {
		return {
			token: entity.token,
			user: undefined,
			created: entity.created,
			shippingAddress: entity.shippingAddress,
			billingAddress: entity.billingAddress,
			lines: entity.lines.map(l => CheckoutLineDto.prepare(l)),
			note: entity.note,
			email: entity.email,
			voucherCode: entity.voucherCode,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			currency: entity.currency,
			country: entity.country,
			discountAmount: entity.discountAmount,
			discountName: entity.discountName,
			languageCode: entity.languageCode,
			lastChange: entity.lastChange,
			redirectUrl: entity.redirectUrl,
			shipping_method_id: entity.shipping_method_id,
			trackingCode: entity.trackingCode,
			translatedDiscountName: entity.translatedDiscountName,
		};
	}
}

export class CreateCheckoutDto extends OmitType(CheckoutDto, ['created', 'lastChange', 'token', 'user', 'billingAddress', 'shippingAddress', 'lines']) {
	@ApiProperty({ type: Number, description: 'The id of the user for this checkout cart' })
	@IsInt()
	userId?: number;

	@ApiProperty({ type: Number })
	@IsInt()
	billingAddressId?: number;

	@ApiProperty({ type: Number })
	@IsInt()
	shippingAddressId?: number;
}

class Test extends PickType(CreateCheckoutDto, ['email', 'note', 'languageCode']) {
}

export class UpdateCheckoutDto extends PartialType(Test) {
}

export class UpdateCheckoutVoucherDto {
	@ApiProperty({ type: String })
	@IsString()
	voucherCode: string;
}

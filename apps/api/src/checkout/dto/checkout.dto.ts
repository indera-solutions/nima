import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
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

export class CreateCheckoutDto extends PickType(CheckoutDto, ['languageCode']) {

}

// export class CreateCheckoutDto extends PickType(CheckoutDto, ['email', 'note', 'shipping_method_id', 'voucherCode',
// 'metadata', 'privateMetadata', 'currency', 'languageCode', 'country']) { @ApiProperty({ type: Number, description:
// 'The id of the user for this checkout cart' }) @IsInt() @IsOptional() userId?: number;  @ApiProperty({ type: Number
// }) @IsInt() @IsOptional() billingAddressId?: number;  @ApiProperty({ type: Number }) @IsInt() @IsOptional()
// shippingAddressId?: number; }


export class UpdateCheckoutDto extends PartialType(PickType(CheckoutDto, ['email', 'note', 'languageCode'])) {
}

export class UpdateCheckoutVoucherDto {
	@ApiProperty({ type: String })
	@IsString()
	voucherCode: string;
}

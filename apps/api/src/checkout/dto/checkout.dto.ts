import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { ShippingMethodDto } from '../../shipping/dto/shipping-method.dto';
import { CheckoutEntity } from '../entities/checkout.entity';
import { CheckoutLineDto } from './checkout-line.dto';

export class CheckoutDto extends OmitType(CheckoutEntity, ['lines', 'shippingMethod']) {
	@ApiProperty({ type: () => CheckoutLineDto, isArray: true })
	@IsArray()
	lines: CheckoutLineDto[];

	@ApiProperty()
	subtotalPrice: number;

	@ApiProperty()
	shippingCost: number;

	@ApiProperty()
	originalShippingCost: number;

	@ApiProperty()
	shippingCostDiscount: number;

	@ApiProperty()
	quantity: number;

	@ApiProperty()
	discount: number;

	@ApiProperty()
	totalCost: number;

	@ApiProperty({ type: () => ShippingMethodDto, required: false })
	shippingMethod?: ShippingMethodDto;

	@ApiProperty({ type: () => CheckoutAvailableShippingDto, isArray: true })
	availableShippingMethods: CheckoutAvailableShippingDto[];
}


export class CheckoutAvailableShippingDto {
	@ApiProperty({ type: () => ShippingMethodDto })
	shippingMethod: ShippingMethodDto;

	@ApiProperty()
	rate: number;
}

export class CreateCheckoutDto extends PickType(CheckoutDto, ['languageCode']) {

}

// export class CreateCheckoutDto extends PickType(CheckoutDto, ['email', 'note', 'shipping_method_id', 'voucherCode',
// 'metadata', 'privateMetadata', 'currency', 'languageCode', 'country']) { @ApiProperty({ type: Number, description:
// 'The id of the user for this checkout cart' }) @IsInt() @IsOptional() userId?: number;  @ApiProperty({ type: Number
// }) @IsInt() @IsOptional() billingAddressId?: number;  @ApiProperty({ type: Number }) @IsInt() @IsOptional()
// shippingAddressId?: number; }


export class UpdateCheckoutDto extends PartialType(PickType(CheckoutDto, ['email', 'note', 'languageCode', 'useShippingAsBilling', 'paymentMethod', 'originalShippingCost', 'shippingCostDiscount', 'shippingCost'])) {
	@ApiProperty({ required: false, type: Number })
	@IsInt()
	@IsOptional()
	shippingMethodId?: number;
}

export class UpdateCheckoutVoucherDto {
	@ApiProperty({ type: String })
	@IsString()
	voucherCode: string;
}

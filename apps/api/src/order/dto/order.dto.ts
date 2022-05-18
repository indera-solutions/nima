import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { OrderEntity } from '../entities/order.entity';

export class OrderDto extends OmitType(OrderEntity, ['lines', 'events', 'searchDocument']) {

	static prepare(entity: OrderEntity): OrderDto {
		return {
			id: entity.id,
			created: entity.created,
			updatedAt: entity.updatedAt,
			trackingClientId: entity.trackingClientId,
			userEmail: entity.userEmail,
			billingAddress: entity.billingAddress,
			shippingAddress: entity.shippingAddress,
			user: entity.user,
			totalNetAmount: entity.totalNetAmount,
			voucher_id: entity.voucher_id,
			languageCode: entity.languageCode,
			shippingPriceGrossAmount: entity.shippingPriceGrossAmount,
			totalGrossAmount: entity.totalGrossAmount,
			shippingPriceNetAmount: entity.shippingPriceNetAmount,
			status: entity.status,
			shippingMethodName: entity.shippingMethodName,
			shippingMethod: entity.shippingMethod,
			displayGrossPrices: entity.displayGrossPrices,
			customerNote: entity.customerNote,
			weight: entity.weight,
			checkoutToken: entity.checkoutToken,
			currency: entity.currency,
			metadata: entity.metadata,
			privateMetadata: entity.privateMetadata,
			redirectUrl: entity.redirectUrl,
			shippingTaxRate: entity.shippingTaxRate,
			undiscountedTotalGrossAmount: entity.undiscountedTotalGrossAmount,
			undiscountedTotalNetAmount: entity.undiscountedTotalNetAmount,
			totalPaidAmount: entity.totalPaidAmount,
			origin: entity.origin,
			original: entity.original,
		};
	}
}

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'created', 'updatedAt']) {
	@ApiProperty({ type: Number, required: false })
	@IsOptional()
	userId?: number;
}

export class CreateOrderFromCheckoutDto {
	@ApiProperty({ type: String })
	@IsString()
	token: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
}

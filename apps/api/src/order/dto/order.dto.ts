import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PaginatedResults } from '@nima-cms/utils';
import { IsOptional, IsString } from 'class-validator';
import { PaymentDto } from '../../payments/dto/payment.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderLineDto } from './order-line.dto';

export class OrderDto extends OmitType(OrderEntity, ['lines', 'events', 'searchDocument', 'payment']) {

	@ApiProperty({ type: () => OrderLineDto, isArray: true })
	lines: OrderLineDto[];

	@ApiProperty({ type: () => PaymentDto })
	payment: PaymentDto;

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
			lines: entity.lines?.map(OrderLineDto.prepare) || [],
			payment: entity.payment ? PaymentDto.prepare(entity.payment) : undefined,
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


export class OrderListPaginated implements PaginatedResults<OrderDto> {
	@ApiProperty({ type: [OrderDto] })
	items: OrderDto[];
	@ApiProperty()
	pageNumber: number;
	@ApiProperty()
	pageSize: number;
	@ApiProperty()
	totalCount: number;
}

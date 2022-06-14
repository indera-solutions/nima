import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaginatedResults } from '@nima-cms/utils';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaymentDto } from '../../payments/dto/payment.dto';
import { OrderEntity } from '../entities/order.entity';
import { OrderEventDto } from './order-event.dto';
import { OrderLineDto } from './order-line.dto';

export class OrderDto extends OmitType(OrderEntity, ['lines', 'searchDocument', 'payment', 'events', 'voucher']) {

	@ApiProperty({ type: () => OrderLineDto, isArray: true })
	lines: OrderLineDto[];

	@ApiProperty({ type: () => PaymentDto })
	payment: PaymentDto;

	@ApiProperty({ type: () => OrderEventDto, isArray: true })
	events: OrderEventDto[];

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
			voucherId: entity.voucherId,
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
			events: entity.events ? entity.events.map(OrderEventDto.prepare) : [],
		};
	}
}

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'created', 'updatedAt', 'events']) {
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


export class UpdateOrderStatusDto extends PickType(CreateOrderDto, ['status']) {
	@ApiProperty()
	@IsBoolean()
	notifyCustomer: boolean;
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

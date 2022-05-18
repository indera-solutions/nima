import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { OrderLineEntity } from '../entities/order-line.entity';

export class OrderLineDto extends OrderLineEntity {
}

export class CreateOrderLineDto extends OmitType(OrderLineDto, ['id', 'variant', 'order']) {
	@ApiProperty({ type: Number })
	variantId: number;

	@ApiProperty({ type: Number })
	orderId: number;
}

export class InternalCreateOrderLineDto extends OmitType(OrderLineDto, ['id']) {
}

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {
}

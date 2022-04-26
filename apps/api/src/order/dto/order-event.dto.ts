import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { OrderEventEntity } from '../entities/order-event.entity';

export class OrderEventDto extends OrderEventEntity {
}

export class CreateOrderEventDto extends OmitType(OrderEventDto, ['id', 'order']) {
	@ApiProperty({ type: Number })
	orderId: number;
}

export class UpdateOrderEventDto extends PartialType(CreateOrderEventDto) {
}

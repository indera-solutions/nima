import { OmitType, PartialType } from '@nestjs/swagger';
import { OrderEventEntity } from '../entities/order-event.entity';

export class OrderEventDto extends OmitType(OrderEventEntity, ['id', 'order', 'user']) {

	static prepare(entity: OrderEventEntity): OrderEventDto {
		return {
			eventType: entity.eventType,
			date: entity.date,
			parameters: entity.parameters,
		};
	}
}

export class CreateOrderEventDto extends OmitType(OrderEventDto, ['date']) {
}

export class UpdateOrderEventDto extends PartialType(CreateOrderEventDto) {
}

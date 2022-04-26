import { OmitType, PartialType } from '@nestjs/swagger';
import { OrderEntity } from '../entities/order.entity';

export class OrderDto extends OrderEntity {

}

export class CreateOrderDto extends OmitType(OrderDto, ['id', 'created', 'updatedAt']) {
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
}

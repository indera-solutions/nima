import { Module } from '@nestjs/common';
import { OrderEventEntity } from './entities/order-event.entity';
import { OrderLineEntity } from './entities/order-line.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {
}

export const OrderModuleEntities = [OrderEntity, OrderLineEntity, OrderEventEntity];

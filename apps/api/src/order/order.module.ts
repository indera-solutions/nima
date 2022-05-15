import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutModule } from '../checkout/checkout.module';
import { OrderEventEntity } from './entities/order-event.entity';
import { OrderLineEntity } from './entities/order-line.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from './entities/order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
	imports: [TypeOrmModule.forFeature([OrderRepository, OrderLineEntity, OrderEventEntity]), CheckoutModule],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {
}

export const OrderModuleEntities = [OrderEntity, OrderLineEntity, OrderEventEntity];

import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckoutModule } from '../checkout/checkout.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { PaymentsModule } from '../payments/payments.module';
import { ProductsModule } from '../products/products.module';
import { ShippingModule } from '../shipping/shipping.module';
import { OrderEventEntity } from './entities/order-event.entity';
import { OrderLineEntity } from './entities/order-line.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEventRepository } from './repositories/order-event.repository';
import { OrderLineRepository } from './repositories/order-line.repository';
import { OrderRepository } from './repositories/order.repository';

@Module({
	imports: [TypeOrmModule.forFeature([OrderRepository, OrderLineRepository, OrderEventRepository]), forwardRef(() => CheckoutModule), ShippingModule, ProductsModule, PaymentsModule, DiscountsModule],
	controllers: [OrderController],
	providers: [OrderService],
	exports: [OrderService],
})
export class OrderModule {
}

export const OrderModuleEntities = [OrderEntity, OrderLineEntity, OrderEventEntity];

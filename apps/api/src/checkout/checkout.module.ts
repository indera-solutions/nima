import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { OrderModule } from '../order/order.module';
import { ProductsModule } from '../products/products.module';
import { ShippingModule } from '../shipping/shipping.module';
import { UsersModule } from '../users/users.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutLineEntity } from './entities/checkout-line.entity';
import { CheckoutLineRepository } from './entities/checkout-line.repository';
import { CheckoutEntity } from './entities/checkout.entity';
import { CheckoutRepository, CheckoutSubscriber } from './entities/checkout.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CheckoutRepository, CheckoutLineRepository]), CoreModule, UsersModule, ProductsModule, ShippingModule, DiscountsModule, forwardRef(() => OrderModule)],
	controllers: [CheckoutController],
	providers: [CheckoutService, CheckoutSubscriber],
	exports: [CheckoutService],
})
export class CheckoutModule {
}

export const CheckoutModuleEntities = [CheckoutEntity, CheckoutLineEntity];

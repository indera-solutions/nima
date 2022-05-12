import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutLineEntity } from './entities/checkout-line.entity';
import { CheckoutLineRepository } from './entities/checkout-line.repository';
import { CheckoutEntity } from './entities/checkout.entity';
import { CheckoutRepository, CheckoutSubscriber } from './entities/checkout.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CheckoutRepository, CheckoutLineRepository]), CoreModule, UsersModule, ProductsModule],
	controllers: [CheckoutController],
	providers: [CheckoutService, CheckoutSubscriber],
})
export class CheckoutModule {
}

export const CheckoutModuleEntities = [CheckoutEntity, CheckoutLineEntity];

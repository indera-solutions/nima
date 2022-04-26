import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutLineEntity } from './entities/checkout-line.entity';
import { CheckoutEntity } from './entities/checkout.entity';

@Module({
	controllers: [CheckoutController],
	providers: [CheckoutService],
})
export class CheckoutModule {
}

export const CheckoutModuleEntities = [CheckoutEntity, CheckoutLineEntity];

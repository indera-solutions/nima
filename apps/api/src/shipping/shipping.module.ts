import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { ShippingZoneEntity } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

@Module({
	imports: [TypeOrmModule.forFeature([ShippingMethodRepository, ShippingZoneEntity])],
	controllers: [ShippingController],
	providers: [ShippingService],
})
export class ShippingModule {
}

export const ShippingModuleEntities = [ShippingMethodEntity, ShippingZoneEntity];

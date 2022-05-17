import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { ShippingZoneEntity } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';
import { ShippingZoneRepository } from './repositories/shipping-zone.repository';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';

@Module({
	imports: [TypeOrmModule.forFeature([ShippingMethodRepository, ShippingZoneRepository]), CoreModule],
	controllers: [ShippingController],
	providers: [ShippingService],
})
export class ShippingModule {
}

export const ShippingModuleEntities = [ShippingMethodEntity, ShippingZoneEntity];

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { ShippingMethodController } from './controllers/shipping-method.controller';
import { ShippingRatesController } from './controllers/shipping-rates.controller';
import { ShippingZonesController } from './controllers/shipping-zones.controller';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { ShippingRateEntity } from './entities/shipping-rate.entity';
import { ShippingZoneEntity } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';
import { ShippingRateRepository } from './repositories/shipping-rate.repository';
import { ShippingZoneRepository } from './repositories/shipping-zone.repository';
import { ShippingService } from './shipping.service';

@Module({
	imports: [TypeOrmModule.forFeature([ShippingMethodRepository, ShippingZoneRepository, ShippingRateRepository]), CoreModule],
	controllers: [ShippingMethodController, ShippingZonesController, ShippingRatesController],
	providers: [ShippingService],
	exports: [ShippingService],
})
export class ShippingModule {
}

export const ShippingModuleEntities = [ShippingMethodEntity, ShippingZoneEntity, ShippingRateEntity];

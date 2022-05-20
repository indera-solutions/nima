import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ShippingZoneEntity } from '../entities/shipping-zone.entity';
import { ShippingRateDto } from './shipping-rate.dto';

export class ShippingZoneDto extends OmitType(ShippingZoneEntity, ['shippingMethod', 'shippingRates']) {

	@ApiProperty(({ type: ShippingRateDto, isArray: true }))
	shippingRates: ShippingRateDto[];

	static prepare(entity: ShippingZoneEntity, options?: { isAdmin?: boolean }): ShippingZoneDto {
		return {
			name: entity.name,
			id: entity.id,
			locationCodes: entity.locationCodes,
			locationType: entity.locationType,
			metadata: entity.metadata,
			shippingRates: entity.shippingRates ? entity.shippingRates.map(rate => ShippingRateDto.prepare(rate, options)) : [],
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
		};
	}
}

export class CreateShippingZoneDto extends OmitType(ShippingZoneDto, ['id']) {
}

export class UpdateShippingZoneDto extends PartialType(CreateShippingZoneDto) {
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ShippingMethodEntity, ShippingMethodType } from '../entities/shipping-method.entity';
import { CreateShippingZoneDto, ShippingZoneDto } from './shipping-zone.dto';


export class ShippingMethodDto extends OmitType(ShippingMethodEntity, ['shippingZones']) {
	@ApiProperty({ type: () => ShippingZoneDto, isArray: true })
	shippingZones: ShippingZoneDto[];

	static prepare(entity: ShippingMethodEntity, options?: { isAdmin?: boolean }): ShippingMethodDto {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			metadata: entity.metadata,
			shippingType: entity.shippingType,
			maximumDeliveryDays: entity.maximumDeliveryDays,
			rate: entity.rate,
			maximumOrderWeight: entity.maximumOrderWeight,
			minimumDeliveryDays: entity.minimumDeliveryDays,
			minimumOrderWeight: entity.minimumOrderWeight,
			threshold: entity.threshold,
			shippingZones: entity.shippingZones?.map(zone => ShippingZoneDto.prepare(zone, options)) || [],
		};
	}

	static calculateCost(params: { method: ShippingMethodDto, totalCost: number }): number {
		const { method, totalCost } = params;
		if ( method.shippingType === ShippingMethodType.FREE_SHIPPING ) {
			if ( method.threshold && method.threshold <= totalCost ) {
				return 0;
			}
		} else if ( method.shippingType === ShippingMethodType.FLAT_RATE ) {
			if ( !method.rate ) {
				console.error('Flat Rate Shipping Type has no rate.');
			}
			return method.rate;
		}
	}
}

export class CreateShippingMethodDto extends OmitType(ShippingMethodDto, ['id', 'shippingZones']) {
	@ApiProperty({ type: () => CreateShippingZoneDto, isArray: true })
	@IsObject({ each: true })
	shippingZones: CreateShippingZoneDto[];
}

export class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {
}

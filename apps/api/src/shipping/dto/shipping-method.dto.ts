import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';
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
			shippingZones: entity.shippingZones?.map(zone => ShippingZoneDto.prepare(zone, options)) || [],
		};
	}

	static calculateCost(method: ShippingMethodDto): number {
		if ( !method.shippingZones ) return 0;
		return method.shippingZones[0]?.shippingRates[0]?.rate || 0;
	}
}

export class CreateShippingMethodDto extends OmitType(ShippingMethodDto, ['id', 'shippingZones']) {
	@ApiProperty({ type: () => CreateShippingZoneDto, isArray: true })
	@IsObject({ each: true })
	shippingZones: CreateShippingZoneDto[];
}

export class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {
}

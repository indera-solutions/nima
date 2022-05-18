import { OmitType, PartialType } from '@nestjs/swagger';
import { ShippingZoneEntity } from '../entities/shipping-zone.entity';

export class ShippingZoneDto extends OmitType(ShippingZoneEntity, ['shippingMethod']) {

	static prepare(entity: ShippingZoneEntity, options?: { isAdmin?: boolean }): ShippingZoneDto {
		return {
			name: entity.name,
			id: entity.id,
			locationCodes: entity.locationCodes,
			locationType: entity.locationType,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			description: entity.description,
		};
	}
}

export class CreateShippingZoneDto extends OmitType(ShippingZoneDto, ['id']) {
}

export class UpdateShippingZoneDto extends PartialType(CreateShippingZoneDto) {
}

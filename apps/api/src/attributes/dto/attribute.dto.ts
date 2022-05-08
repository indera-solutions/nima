import { OmitType, PartialType } from '@nestjs/swagger';
import { AttributeEntity } from '../entities/attribute.entity';

export class AttributeDto extends OmitType(AttributeEntity, ['values']) {
	static prepare(entity: AttributeEntity, options?: { isAdmin?: boolean }): AttributeDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			metadata: entity.metadata,
			availableInGrid: entity.availableInGrid,
			filterableInDashboard: entity.filterableInDashboard,
			filterableInStorefront: entity.filterableInStorefront,
			inputType: entity.inputType,
			storefrontSearchPosition: entity.storefrontSearchPosition,
			unit: entity.unit,
			valueRequired: entity.valueRequired,
			visibleInStorefront: entity.visibleInStorefront,
		};
	}
}

export class CreateAttributeDto extends OmitType(AttributeDto, ['id']) {
}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
}

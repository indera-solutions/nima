import { OmitType, PartialType } from '@nestjs/swagger';
import { AttributeValueEntity } from '../entities/attribute-value.entity';

export class AttributeValueDto extends OmitType(AttributeValueEntity, ['attribute']) {
	static prepare(entity: AttributeValueEntity, options?: { isAdmin?: boolean }): AttributeValueDto {
		return {
			id: entity.id,
			sortOrder: entity.sortOrder,
			boolean: entity.boolean,
			value: entity.value,
			name: entity.name,
			slug: entity.slug,
			dateTime: entity.dateTime,
			fileUrl: entity.fileUrl,
			richText: entity.richText,
		};
	}
}

export class CreateAttributeValueDto extends OmitType(AttributeValueDto, ['id']) {
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { MediaDto } from '../../core/dto/media.dto';
import { AttributeValueEntity } from '../entities/attribute-value.entity';

export class AttributeValueDto extends OmitType(AttributeValueEntity, ['attribute', 'media']) {

	@ApiProperty({ type: MediaDto })
	media?: MediaDto;

	static prepare(entity: AttributeValueEntity, options?: { isAdmin?: boolean }): AttributeValueDto {
		return {
			id: entity.id,
			sortOrder: entity.sortOrder,
			boolean: entity.boolean,
			value: entity.value,
			name: entity.name,
			slug: entity.slug,
			dateTime: entity.dateTime,
			media: entity.media ? MediaDto.prepare(entity.media) : undefined,
			richText: entity.richText,
		};
	}
}

export class CreateAttributeValueDto extends OmitType(AttributeValueDto, ['id', 'media']) {

	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	mediaId?: number;
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {
}

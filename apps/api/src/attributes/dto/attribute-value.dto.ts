import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AttributeValueEntity } from '../entities/attribute-value.entity';

export class AttributeValueDto extends AttributeValueEntity {
}

export class CreateAttributeValueDto extends OmitType(AttributeValueDto, ['id', 'attribute']) {
	@ApiProperty({ type: Number, example: 1 })
	attributeId: number;
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {
}

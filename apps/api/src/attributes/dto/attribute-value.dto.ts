import { OmitType, PartialType } from '@nestjs/swagger';
import { AttributeValueEntity } from '../entities/attribute-value.entity';

export class AttributeValueDto extends AttributeValueEntity {
}

export class CreateAttributeValueDto extends OmitType(AttributeValueDto, ['id', 'attribute']) {
}

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {
}

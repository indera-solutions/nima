import { OmitType, PartialType } from '@nestjs/swagger';
import { AttributeEntity } from '../entities/attribute.entity';

export class AttributeDto extends OmitType(AttributeEntity, ['values']) {
}

export class CreateAttributeDto extends OmitType(AttributeDto, ['id']) {
}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
}

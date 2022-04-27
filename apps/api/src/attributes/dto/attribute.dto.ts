import { OmitType, PartialType } from '@nestjs/swagger';
import { ICreateAttributeDto } from '@nima/interfaces';
import { AttributeEntity } from '../entities/attribute.entity';

export class AttributeDto extends OmitType(AttributeEntity, ['values']) {
}

export class CreateAttributeDto extends OmitType(AttributeDto, ['id']) implements ICreateAttributeDto {
}

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
}

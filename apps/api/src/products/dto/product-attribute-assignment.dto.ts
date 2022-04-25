import { OmitType, PartialType } from '@nestjs/swagger';
import {
	AssignedProductAttributeEntity,
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../entities/product-attribute-assignment.entity';

// export class AssignedProductAttributeDto extends OmitType(AssignedProductAttributeEntity, []){
export class AssignedProductAttributeDto extends AssignedProductAttributeEntity {
}

export class CreateAssignedProductAttributeDto extends OmitType(AssignedProductAttributeDto, ['id']) {
}

export class UpdateAssignedProductAttributeDto extends PartialType(CreateAssignedProductAttributeDto) {
}

// export class AssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueEntity, []){
export class AssignedProductAttributeValueDto extends AssignedProductAttributeValueEntity {
}

export class CreateAssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueDto, ['id']) {
}

export class UpdateAssignedProductAttributeValueDto extends PartialType(CreateAssignedProductAttributeValueDto) {
}

// export class AssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeEntity, []){
export class AssignedProductVariantAttributeDto extends AssignedProductVariantAttributeEntity {
}

export class CreateAssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeDto, ['id']) {
}

export class UpdateAssignedProductVariantAttributeDto extends PartialType(CreateAssignedProductVariantAttributeDto) {
}

// export class AssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeEntity, []){
export class AssignedProductVariantAttributeValueDto extends AssignedProductVariantAttributeValueEntity {
}

export class CreateAssignedProductVariantAttributeValueDto extends OmitType(AssignedProductVariantAttributeValueDto, ['id']) {
}

export class UpdateAssignedProductVariantAttributeValueDto extends PartialType(CreateAssignedProductVariantAttributeValueDto) {
}


import { OmitType, PartialType } from '@nestjs/swagger';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from '../entities/product-attribute-assignment.entity';

// export class AssignedProductAttributeDto extends OmitType(AssignedProductAttributeEntity, []){
export class AssignedProductAttributeDto extends AssignedProductAttributeEntity {
}

export class CreateAssignedProductAttributeDto extends OmitType(AssignedProductAttributeDto, ['id']) {
}

export class UpdateAssignedProductAttributeDto extends PartialType(CreateAssignedProductAttributeDto) {
}

// export class AssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeEntity, []){
export class AssignedProductVariantAttributeDto extends AssignedProductVariantAttributeEntity {
}

export class CreateAssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeDto, ['id']) {
}

export class UpdateAssignedProductVariantAttributeDto extends PartialType(CreateAssignedProductVariantAttributeDto) {
}


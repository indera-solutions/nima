import { OmitType, PartialType } from '@nestjs/swagger';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../entities/product-attribute-value-assignment.entity';

// export class AssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueEntity, []){
export class AssignedProductAttributeValueDto extends AssignedProductAttributeValueEntity {
}

export class CreateAssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueDto, ['id']) {
}

export class UpdateAssignedProductAttributeValueDto extends PartialType(CreateAssignedProductAttributeValueDto) {
}


// export class AssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeEntity, []){
export class AssignedProductVariantAttributeValueDto extends AssignedProductVariantAttributeValueEntity {
}

export class CreateAssignedProductVariantAttributeValueDto extends OmitType(AssignedProductVariantAttributeValueDto, ['id']) {
}

export class UpdateAssignedProductVariantAttributeValueDto extends PartialType(CreateAssignedProductVariantAttributeValueDto) {
}

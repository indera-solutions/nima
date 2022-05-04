import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AttributeValueDto } from '../../attributes/dto/attribute-value.dto';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../entities/product-attribute-value-assignment.entity';

export class AssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueEntity, ['assignedProductAttribute', 'value']) {
	@ApiProperty()
	value: AttributeValueDto;

	static prepare(entity: AssignedProductAttributeValueEntity, options?: { isAdmin?: boolean }): AssignedProductAttributeValueDto {
		return {
			id: entity.id,
			sortOrder: entity.sortOrder,
			value: AttributeValueDto.prepare(entity.value),
		};
	}
}

export class CreateAssignedProductAttributeValueDto extends OmitType(AssignedProductAttributeValueDto, ['id', 'value']) {
	@ApiProperty()
	valueId: number;
}

export class UpdateAssignedProductAttributeValueDto extends PartialType(CreateAssignedProductAttributeValueDto) {
}


export class AssignedProductVariantAttributeValueDto extends OmitType(AssignedProductVariantAttributeValueEntity, ['value', 'assignedProductVariantAttribute']) {
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValueDto;

	static prepare(entity: AssignedProductVariantAttributeValueEntity, options?: { isAdmin?: boolean }): AssignedProductVariantAttributeValueDto {
		return {
			id: entity.id,
			sortOrder: entity.sortOrder,
			value: AttributeValueDto.prepare(entity.value),
		};
	}
}

export class CreateAssignedProductVariantAttributeValueDto extends OmitType(AssignedProductVariantAttributeValueDto, ['id', 'value']) {
	@ApiProperty()
	valueId: number;
}

export class UpdateAssignedProductVariantAttributeValueDto extends PartialType(CreateAssignedProductVariantAttributeValueDto) {
}

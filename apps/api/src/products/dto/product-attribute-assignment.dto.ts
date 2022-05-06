import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { AttributeValueDto } from '../../attributes/dto/attribute-value.dto';
import { AttributeDto } from '../../attributes/dto/attribute.dto';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import {
	ProductTypeAttributeDto,
	ProductTypeVariantAttributeDto,
} from '../../product-types/dto/product-type-attribute.dto';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from '../entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueDto,
	AssignedProductVariantAttributeValueDto,
	CreateAssignedProductAttributeValueDto,
	CreateAssignedProductVariantAttributeValueDto,
} from './product-attribute-value-assignment.dto';

export class AssignedProductAttributeDto extends OmitType(AssignedProductAttributeEntity, ['values', 'product', 'productTypeAttribute']) {
	@ApiProperty({ type: [AssignedProductAttributeValueDto] })
	values: AssignedProductAttributeValueDto[];

	@ApiProperty({ type: ProductTypeAttributeDto })
	productTypeAttribute: ProductTypeAttributeDto;

	static prepare(entity: AssignedProductAttributeEntity): AssignedProductAttributeDto {
		return {
			id: entity.id,
			productTypeAttribute: ProductTypeAttributeDto.prepare(entity.productTypeAttribute),
			values: entity.values,
		};
	}
}

export class CreateAssignedProductAttributeDto extends OmitType(AssignedProductAttributeDto, ['id', 'values', 'productTypeAttribute']) {
	@ApiProperty()
	productTypeAttributeId: number;

	@ApiProperty({ type: [CreateAssignedProductAttributeValueDto] })
	values: CreateAssignedProductAttributeValueDto[];
}

export class UpdateAssignedProductAttributeDto extends PartialType(CreateAssignedProductAttributeDto) {
}

export class AssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeEntity, ['productTypeVariantAttribute', 'variant', 'values']) {
	@ApiProperty({ type: [AssignedProductVariantAttributeValueDto] })
	values: AssignedProductVariantAttributeValueDto[];

	@ApiProperty({ type: ProductTypeVariantAttributeDto })
	productTypeVariantAttribute: ProductTypeVariantAttributeDto;

	static prepare(entity: AssignedProductVariantAttributeEntity): AssignedProductVariantAttributeDto {
		return {
			id: entity.id,
			productTypeVariantAttribute: ProductTypeVariantAttributeDto.prepare(entity.productTypeVariantAttribute),
			values: entity.values.map(v => AssignedProductVariantAttributeValueDto.prepare(v)),
		};
	}
}

export class CreateAssignedProductVariantAttributeDto extends OmitType(AssignedProductVariantAttributeDto, ['id', 'values']) {
	@ApiProperty({ type: [CreateAssignedProductVariantAttributeValueDto] })
	values: CreateAssignedProductVariantAttributeValueDto[];

	@ApiProperty()
	productTypeVariantAttributeId: number;
}

export class UpdateAssignedProductVariantAttributeDto extends PartialType(CreateAssignedProductVariantAttributeDto) {
}

export class ProductAttributeDto extends OmitType(AttributeEntity, ['values']) {
	@ApiProperty({ type: [AttributeValueDto] })
	values: AttributeValueDto[];

	static prepare(attr: AssignedProductAttributeEntity): ProductAttributeDto {
		return {
			...AttributeDto.prepare(attr.productTypeAttribute.attribute),
			values: attr.values.map(av => av.value).map(v => AttributeValueDto.prepare(v)),
		};
	}

	static prepareVariant(attr: AssignedProductVariantAttributeEntity): ProductAttributeDto {
		return {
			...AttributeDto.prepare(attr.productTypeVariantAttribute.attribute),
			values: attr.values.map(av => av.value).map(v => AttributeValueDto.prepare(v)),
		};
	}
}


import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends OmitType(ProductTypeAttributeEntity, ['productType', 'attribute']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;


	static prepare(entity: ProductTypeAttributeEntity): ProductTypeAttributeDto {
		return {
			id: entity.id,
			attributeId: entity.attribute.id,
			sortOrder: entity.sortOrder,
		};
	}
}

export class CreateProductTypeAttributeDto extends ProductTypeAttributeDto {
}

export class UpdateProductTypeAttributeDto extends CreateProductTypeAttributeDto {
}

export class ProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeEntity, ['productType', 'attribute']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;

	static prepare(entity: ProductTypeVariantAttributeEntity): ProductTypeVariantAttributeDto {
		return {
			id: entity.id,
			attributeId: entity.attribute.id,
			sortOrder: entity.sortOrder,
			variantSelection: entity.variantSelection,
		};
	}
}

export class CreateProductTypeVariantAttributeDto extends ProductTypeVariantAttributeDto {
}

export class UpdateProductTypeVariantAttributeDto extends CreateProductTypeVariantAttributeDto {
}

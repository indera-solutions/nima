import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends OmitType(ProductTypeAttributeEntity, ['productType']) {
}

export class CreateProductTypeAttributeDto extends OmitType(ProductTypeAttributeDto, ['id', 'attribute']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class UpdateProductTypeAttributeDto extends PartialType(CreateProductTypeAttributeDto) {
}

export class ProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeEntity, ['productType']) {
}

export class CreateProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeDto, ['id', 'attribute']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class UpdateProductTypeVariantAttributeDto extends PartialType(CreateProductTypeVariantAttributeDto) {
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends ProductTypeAttributeEntity {
}

export class CreateProductTypeAttributeDto extends OmitType(ProductTypeAttributeDto, ['id', 'attribute', 'productType']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class UpdateProductTypeAttributeDto extends PartialType(CreateProductTypeAttributeDto) {
}

export class ProductTypeVariantAttributeDto extends ProductTypeVariantAttributeEntity {
}

export class CreateProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeDto, ['id', 'attribute', 'productType']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class UpdateProductTypeVariantAttributeDto extends PartialType(CreateProductTypeVariantAttributeDto) {
}

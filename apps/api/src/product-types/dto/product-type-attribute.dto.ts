import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends OmitType(ProductTypeAttributeEntity, ['productType', 'attribute', 'id']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class CreateProductTypeAttributeDto extends ProductTypeAttributeDto {
}

export class UpdateProductTypeAttributeDto extends CreateProductTypeAttributeDto {
}

export class ProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeEntity, ['productType', 'attribute', 'id']) {
	@ApiProperty()
	@IsInt()
	attributeId: number;
}

export class CreateProductTypeVariantAttributeDto extends ProductTypeVariantAttributeDto {
}

export class UpdateProductTypeVariantAttributeDto extends CreateProductTypeVariantAttributeDto {
}

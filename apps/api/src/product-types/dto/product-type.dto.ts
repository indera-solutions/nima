import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ProductTypeEntity } from '../entities';
import { ProductTypeAttributeDto, ProductTypeVariantAttributeDto } from './product-type-attribute.dto';

export class ProductTypeDto extends OmitType(ProductTypeEntity, ['attributes', 'variantAttributes']) {
	@ApiProperty({ type: [ProductTypeAttributeDto] })
	@IsArray()
	attributes: ProductTypeAttributeDto[];

	@ApiProperty({ type: [ProductTypeVariantAttributeDto] })
	@IsArray()
	variantAttributes: ProductTypeVariantAttributeDto[];
}

export class CreateProductTypeDto extends OmitType(ProductTypeDto, ['id']) {
}

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ProductTypeEntity } from '../entities';
import { ProductTypeAttributeDto, ProductTypeVariantAttributeDto } from './product-type-attribute.dto';

// export class ProductTypeDto extends OmitType(ProductTypeEntity, []) {
export class ProductTypeDto extends ProductTypeEntity {
}

export class CreateProductTypeDto extends OmitType(ProductTypeDto, ['id']) {
}

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
}

export class AttributesOfProductTypeDto {
	@ApiProperty({ type: [ProductTypeAttributeDto] })
	attributes: ProductTypeAttributeDto[];

	@ApiProperty({ type: [ProductTypeVariantAttributeDto] })
	variantAttributes: ProductTypeVariantAttributeDto[];
}

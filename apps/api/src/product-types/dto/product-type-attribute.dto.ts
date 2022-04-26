import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends ProductTypeAttributeEntity {
}

export class CreateProductTypeAttributeDto extends OmitType(ProductTypeAttributeDto, ['id']) {
}

export class ProductTypeVariantAttributeDto extends ProductTypeVariantAttributeEntity {
}

export class CreateProductTypeVariantAttributeDto extends OmitType(ProductTypeVariantAttributeDto, ['id', 'attribute', 'productType']) {
	@ApiProperty()
	attributeId: number;

	@ApiProperty()
	productTypeId: number;
}

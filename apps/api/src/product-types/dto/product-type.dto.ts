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

	static prepare(entity: ProductTypeEntity, options?: { isAdmin?: boolean }): ProductTypeDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			hasVariants: entity.hasVariants,
			isDigital: entity.isDigital,
			isShippingRequired: entity.isShippingRequired,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			weight: entity.weight,
			attributes: entity.attributes.map(pta => ProductTypeAttributeDto.prepare(pta)),
			variantAttributes: entity.variantAttributes.map(ptva => ProductTypeVariantAttributeDto.prepare(ptva)),
		};
	}
}

export class CreateProductTypeDto extends OmitType(ProductTypeDto, ['id', 'hasVariants']) {
}

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
}

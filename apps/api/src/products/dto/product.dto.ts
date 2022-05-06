import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { ProductEntity } from '../entities/product.entity';
import { CreateAssignedProductAttributeDto, ProductAttributeDto } from './product-attribute-assignment.dto';
import { ProductVariantDto } from './product-variant.dto';

export class ProductDto extends OmitType(ProductEntity, ['productType', 'attributes', 'category', 'defaultVariant']) {
	@ApiProperty()
	@IsInt()
	productTypeId: number;

	@ApiProperty({ type: () => CategoryDto })
	@IsInt()
	categoryId: CategoryDto;

	@ApiProperty({ type: () => [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty({ type: () => ProductVariantDto })
	defaultVariant: ProductVariantDto;

	static prepare(entity: ProductEntity, options?: { isAdmin?: boolean }): ProductDto {
		console.dir(entity, { depth: 100 });
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			productTypeId: entity.productType.id,
			categoryId: CategoryDto.prepare(entity.category),
			chargeTaxes: entity.chargeTaxes,
			created: entity.created,
			currency: entity.currency,
			weight: entity.weight,
			defaultVariant: ProductVariantDto.prepare(entity.defaultVariant),
			description: entity.description,
			descriptionPlaintext: entity.descriptionPlaintext,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			isAvailableForPurchase: entity.isAvailableForPurchase,
			isPublished: entity.isPublished,
			isVisibleInListings: entity.isVisibleInListings,
			minPrice: entity.minPrice,
			rating: entity.rating,
			searchDocument: entity.searchDocument,
			seoDescription: entity.seoDescription,
			seoTitle: entity.seoTitle,
			updatedAt: entity.updatedAt,
			attributes: entity.attributes.map(attr => ProductAttributeDto.prepare(attr)),
		};
	}
}

export class CreateProductDto extends OmitType(ProductDto, ['id', 'attributes', 'created', 'updatedAt', 'defaultVariant']) {
	@ApiProperty({ type: [CreateAssignedProductAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductAttributeDto[];

	@ApiProperty()
	@IsInt()
	defaultVariantId: number;
}

export class UpdateProductDto extends PartialType(ProductDto) {
}

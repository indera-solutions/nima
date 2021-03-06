import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { CollectionDto } from '../../collections/dto/collection.dto';
import { CreateSortableMediaDto, SortableMediaDto } from '../../core/dto/media.dto';
import { ProductEntity } from '../entities/product.entity';
import { CreateAssignedProductAttributeDto, ProductAttributeDto } from './product-attribute-assignment.dto';
import { ProductVariantDto } from './product-variant.dto';

export class ProductDto extends OmitType(ProductEntity, ['productType', 'productMedia', 'attributes', 'category', 'defaultVariant', 'searchDocument', 'collections']) {
	@ApiProperty()
	@IsInt()
	productTypeId: number;

	@ApiProperty()
	@IsInt()
	categoryId: number;

	@ApiProperty({ type: () => [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty({ type: () => SortableMediaDto, isArray: true })
	productMedia: SortableMediaDto[];

	@ApiProperty({ type: () => CollectionDto, isArray: true })
	collections: CollectionDto[];

	@ApiProperty({ type: () => ProductVariantDto, required: false })
	defaultVariant?: ProductVariantDto;

	static prepare(entity: ProductEntity, options?: { isAdmin?: boolean }): ProductDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			productTypeId: entity.productType ? entity.productType.id : undefined,
			categoryId: entity.category ? entity.category.id : undefined,
			chargeTaxes: entity.chargeTaxes,
			created: entity.created,
			currency: entity.currency,
			weight: entity.weight,
			defaultVariantId: entity.defaultVariantId || entity.defaultVariant?.id,
			description: entity.description,
			descriptionRaw: options?.isAdmin ? entity.descriptionRaw : {},
			additionalDescription: entity.additionalDescription,
			additionalDescriptionRaw: options?.isAdmin ? entity.additionalDescriptionRaw : {},
			descriptionPlaintext: entity.descriptionPlaintext,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			isAvailableForPurchase: entity.isAvailableForPurchase,
			isPublished: entity.isPublished,
			isVisibleInListings: entity.isVisibleInListings,
			minPrice: entity.minPrice,
			defaultVariant: entity.defaultVariant ? ProductVariantDto.prepare(entity.defaultVariant) : undefined,
			rating: entity.rating,
			seoDescription: entity.seoDescription,
			productMedia: entity.productMedia ? entity.productMedia.sort((a, b) => a.sortOrder - b.sortOrder).map(pm => SortableMediaDto.prepare(pm)) : [],
			seoTitle: entity.seoTitle,
			updatedAt: entity.updatedAt,
			attributes: entity.attributes ? entity.attributes
												  .sort((a, b) => {
													  return a.productTypeAttribute.sortOrder - b.productTypeAttribute.sortOrder;
												  })
												  .map(attr => ProductAttributeDto.prepare(attr)) : undefined,
			collections: entity.collections ? entity.collections.map(collection => CollectionDto.prepare(collection.collection)) : [],
		};
	}
}

export class CreateProductDto extends OmitType(ProductDto, ['id', 'attributes', 'defaultVariant', 'created', 'updatedAt', 'productMedia', 'defaultVariantId', 'categoryId', 'collections']) {
	@ApiProperty({ type: [CreateAssignedProductAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductAttributeDto[];

	@ApiProperty()
	@IsInt()
	categoryId: number;

	@ApiProperty({ type: () => CreateSortableMediaDto, isArray: true })
	@IsArray()
	productMedia: CreateSortableMediaDto[];

	@ApiProperty({ type: Number, isArray: true })
	@IsArray()
	collectionIds: number[];
}

export class UpdateProductDto extends PartialType(PickType(ProductDto, [
	'name',
	'description',
	'descriptionRaw',
	'additionalDescription',
	'additionalDescriptionRaw',
	'metadata',
	'privateMetadata',
	'isPublished',
])) {
}

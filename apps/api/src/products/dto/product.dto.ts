import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { CreateSortableMediaDto, SortableMediaDto } from '../../core/dto/media.dto';
import { ProductEntity } from '../entities/product.entity';
import { CreateAssignedProductAttributeDto, ProductAttributeDto } from './product-attribute-assignment.dto';

export class ProductDto extends OmitType(ProductEntity, ['productType', 'productMedia', 'attributes', 'category', 'defaultVariant', 'searchDocument']) {
	@ApiProperty()
	@IsInt()
	productTypeId: number;

	@ApiProperty()
	@IsInt()
	categoryId: number;

	@ApiProperty({ type: () => [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty()
	defaultVariantId: number;

	@ApiProperty({ type: () => SortableMediaDto, isArray: true })
	productMedia: SortableMediaDto[];

	static prepare(entity: ProductEntity, options?: { isAdmin?: boolean }): ProductDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			productTypeId: entity.productType.id,
			categoryId: entity.category.id,
			chargeTaxes: entity.chargeTaxes,
			created: entity.created,
			currency: entity.currency,
			weight: entity.weight,
			defaultVariantId: entity.defaultVariant?.id,
			description: entity.description,
			descriptionPlaintext: entity.descriptionPlaintext,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			isAvailableForPurchase: entity.isAvailableForPurchase,
			isPublished: entity.isPublished,
			isVisibleInListings: entity.isVisibleInListings,
			minPrice: entity.minPrice,
			rating: entity.rating,
			seoDescription: entity.seoDescription,
			productMedia: entity.productMedia.map(pm => SortableMediaDto.prepare(pm)),
			seoTitle: entity.seoTitle,
			updatedAt: entity.updatedAt,
			attributes: entity.attributes.map(attr => ProductAttributeDto.prepare(attr)),
		};
	}
}

export class CreateProductDto extends OmitType(ProductDto, ['id', 'attributes', 'created', 'updatedAt', 'productMedia', 'defaultVariantId', 'categoryId']) {
	@ApiProperty({ type: [CreateAssignedProductAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductAttributeDto[];

	// @ApiProperty()
	// @IsInt()
	// defaultVariantId: number;


	@ApiProperty()
	@IsInt()
	categoryId: number;

	@ApiProperty({ type: () => CreateSortableMediaDto, isArray: true })
	@IsArray()
	productMedia: CreateSortableMediaDto[];
}

export class UpdateProductDto extends PartialType(ProductDto) {
}

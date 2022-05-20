import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { CollectionDto } from '../../collections/dto/collection.dto';
import { ProductVariantDto } from '../../products/dto/product-variant.dto';
import { ProductDto } from '../../products/dto/product.dto';
import { DiscountSaleEntity } from '../entities/discount-sale.entity';

export class DiscountSaleDto extends OmitType(DiscountSaleEntity, ['categories', 'products', 'variants', 'collections']) {
	@ApiProperty({ type: [CategoryDto] })
	categories: CategoryDto[];

	@ApiProperty({ type: [ProductDto] })
	products: ProductDto[];

	@ApiProperty({ type: [ProductVariantDto] })
	variants: ProductVariantDto[];

	@ApiProperty({ type: [CollectionDto] })
	collections: CollectionDto[];

	static prepare(entity: DiscountSaleEntity, options?: { isAdmin?: boolean }): DiscountSaleDto {
		return {
			name: entity.name,
			id: entity.id,
			products: entity.products.map(p => ProductDto.prepare(p)),
			categories: entity.categories.map(c => CategoryDto.prepare(c)),
			variants: entity.variants.map(v => ProductVariantDto.prepare(v)),
			collections: entity.collections.map(c => CollectionDto.prepare(c)),
			updatedAt: entity.updatedAt,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			discountType: entity.discountType,
			created: entity.created,
			endDate: entity.endDate,
			startDate: entity.startDate,
			discountValue: entity.discountValue,
		};
	}
}

export class CreateDiscountSaleDto extends OmitType(DiscountSaleDto, ['id', 'created', 'updatedAt', 'categories', 'products', 'collections', 'variants']) {
}

export class DiscountSaleAddProductsDto {
	@ApiProperty({ type: [Number] })
	@IsInt({ each: true })
	productIds: number[];
}

export class DiscountSaleAddCategoriesDto {
	@ApiProperty({ type: [Number] })
	@IsInt({ each: true })
	categoryIds: number[];
}

export class DiscountSaleAddCollectionsDto {
	@ApiProperty({ type: [Number] })
	@IsInt({ each: true })
	collectionIds: number[];
}

export class DiscountSaleAddVariantsDto {
	@ApiProperty({ type: [Number] })
	@IsInt({ each: true })
	variantIds: number[];
}

export class UpdateDiscountDto extends PartialType(CreateDiscountSaleDto) {
}

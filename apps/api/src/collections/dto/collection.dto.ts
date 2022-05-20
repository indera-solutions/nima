import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { MediaDto } from '../../core/dto/media.dto';
import { ProductDto } from '../../products/dto/product.dto';
import { CollectionProductsEntity } from '../entities/collection-products.entity';
import { CollectionEntity } from '../entities/collection.entity';

export class CollectionDto extends OmitType(CollectionEntity, ['backgroundImage', 'products']) {
	@ApiProperty({ type: () => MediaDto })
	backgroundImage: MediaDto;

	@ApiProperty({ type: () => CollectionProductsDto, isArray: true })
	products: CollectionProductsDto[];

	static prepare(entity: CollectionEntity, options?: { isAdmin?: boolean }): CollectionDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			backgroundImage: entity.backgroundImage ? MediaDto.prepare(entity.backgroundImage) : undefined,
			seoDescription: entity.seoDescription,
			seoTitle: entity.seoTitle,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			description: entity.description,
			products: entity.products.map(product => CollectionProductsDto.prepare(product, options)),
		};
	}
}

export class CreateCollectionDto extends OmitType(CollectionDto, ['id', 'products', 'backgroundImage']) {
	@ApiProperty({ type: () => CreateCollectionProductDto, isArray: true })
	@ValidateNested()
	@Type(() => CreateCollectionProductDto)
	products: CreateCollectionProductDto[];

	@ApiProperty()
	@IsInt()
	@IsOptional()
	backgroundImageId?: number;
}

export class UpdateCollectionDto extends PartialType(OmitType(CreateCollectionDto, ['products'])) {
}

export class CollectionProductsDto extends PickType(CollectionProductsEntity, ['sortOrder']) {
	@ApiProperty({ type: () => ProductDto })
	product: ProductDto;

	static prepare(entity: CollectionProductsEntity, options?: { isAdmin?: boolean }): CollectionProductsDto {
		return {
			product: ProductDto.prepare(entity.product, options),
			sortOrder: entity.sortOrder,
		};
	}
}

export class CreateCollectionProductDto {
	@ApiProperty()
	@IsInt()
	productId: number;

	@ApiProperty()
	@IsInt()
	sortOrder: number;
}

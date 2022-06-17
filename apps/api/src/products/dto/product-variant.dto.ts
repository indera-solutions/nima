import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateSortableMediaDto, SortableMediaDto } from '../../core/dto/media.dto';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { CreateAssignedProductVariantAttributeDto, ProductAttributeDto } from './product-attribute-assignment.dto';

export class ProductVariantDto extends OmitType(ProductVariantEntity, ['attributes', 'product', 'productMedia']) {
	@ApiProperty({ type: [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty({ type: () => SortableMediaDto, isArray: true })
	productMedia: SortableMediaDto[];

	static prepare(entity: ProductVariantEntity, options?: { isAdmin?: boolean }): ProductVariantDto {
		return {
			id: entity.id,
			name: entity.name,
			created: entity.created,
			currency: entity.currency,
			weight: entity.weight,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			updatedAt: entity.updatedAt,
			attributes: (entity.attributes || [])
				.sort((a, b) => {
					console.log(a.productTypeVariantAttribute);
					return a.productTypeVariantAttribute.sortOrder - b.productTypeVariantAttribute.sortOrder;
				})
				.map(attr => ProductAttributeDto.prepareVariant(attr)),
			sortOrder: entity.sortOrder,
			productId: entity.productId,
			priceAmount: entity.priceAmount,
			sku: entity.sku,
			stock: entity.stock,
			trackInventory: entity.trackInventory,
			productMedia: (entity.productMedia || []).map(pm => SortableMediaDto.prepare(pm)),
			discountedPrice: entity.discountedPrice,
		};
	}
}

export class CreateProductVariantDto extends OmitType(ProductVariantDto, ['created', 'id', 'updatedAt', 'productId', 'productMedia', 'attributes', 'discountedPrice']) {
	@ApiProperty({ type: [CreateAssignedProductVariantAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductVariantAttributeDto[];

	@ApiProperty({ type: () => CreateSortableMediaDto, isArray: true })
	@IsArray()
	productMedia: CreateSortableMediaDto[];
}

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) {
}

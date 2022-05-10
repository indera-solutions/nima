import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateSortableMediaDto, SortableMediaDto } from '../../core/dto/media.dto';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { CreateAssignedProductVariantAttributeDto, ProductAttributeDto } from './product-attribute-assignment.dto';
import { ProductDto } from './product.dto';

export class ProductVariantDto extends OmitType(ProductVariantEntity, ['attributes', 'product', 'productMedia']) {
	@ApiProperty({ type: [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty({ type: ProductDto })
	product: ProductDto;

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
			attributes: entity.attributes.map(attr => ProductAttributeDto.prepareVariant(attr)),
			sortOrder: entity.sortOrder,
			product: entity.product ? ProductDto.prepare(entity.product) : undefined,
			costPriceAmount: entity.costPriceAmount,
			isPreorder: entity.isPreorder,
			preorderEndDate: entity.preorderEndDate,
			preorderGlobalThreshold: entity.preorderGlobalThreshold,
			priceAmount: entity.priceAmount,
			sku: entity.sku,
			quantityLimitPerCustomer: entity.quantityLimitPerCustomer,
			stock: entity.stock,
			trackInventory: entity.trackInventory,
			productMedia: entity.productMedia.map(pm => SortableMediaDto.prepare(pm)),
		};
	}
}

export class CreateProductVariantDto extends OmitType(ProductVariantDto, ['created', 'id', 'updatedAt', 'product', 'productMedia', 'attributes']) {
	@ApiProperty({ type: [CreateAssignedProductVariantAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductVariantAttributeDto[];

	@ApiProperty({ type: () => CreateSortableMediaDto, isArray: true })
	@IsArray()
	productMedia: CreateSortableMediaDto[];
}

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) {
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import {
	CreateAssignedProductAttributeDto,
	CreateAssignedProductVariantAttributeDto,
	ProductAttributeDto,
} from './product-attribute-assignment.dto';
import { ProductDto } from './product.dto';

export class ProductVariantDto extends OmitType(ProductVariantEntity, ['attributes', 'product']) {
	@ApiProperty({ type: [ProductAttributeDto] })
	@IsArray()
	attributes: ProductAttributeDto[];

	@ApiProperty({ type: ProductDto })
	product: ProductDto;

	static prepare(entity: ProductVariantEntity, options?: { isAdmin?: boolean }): ProductVariantDto {
		console.dir(entity.attributes, { depth: 100 });
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
		};
	}
}

export class CreateProductVariantDto extends OmitType(ProductVariantDto, ['created', 'id', 'updatedAt', 'product', 'attributes']) {
	@ApiProperty({ type: [CreateAssignedProductAttributeDto] })
	@IsArray()
	attributes: CreateAssignedProductVariantAttributeDto[];
}

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) {
}

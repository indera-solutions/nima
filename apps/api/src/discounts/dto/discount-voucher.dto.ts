import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CategoryDto } from '../../categories/dto/category.dto';
import { CollectionDto } from '../../collections/dto/collection.dto';
import { ProductVariantDto } from '../../products/dto/product-variant.dto';
import { ProductDto } from '../../products/dto/product.dto';
import { DiscountVoucherEntity } from '../entities/discount-voucher.entity';

export class DiscountVoucherDto extends OmitType(DiscountVoucherEntity, ['products', 'categories', 'variants', 'collections']) {
	@ApiProperty({ type: [CategoryDto] })
	categories: CategoryDto[];

	@ApiProperty({ type: [ProductDto] })
	products: ProductDto[];

	@ApiProperty({ type: [ProductVariantDto] })
	variants: ProductVariantDto[];

	@ApiProperty({ type: [CollectionDto] })
	collections: CollectionDto[];
}

export class CreateDiscountVoucherDto extends OmitType(DiscountVoucherDto, ['id', 'created', 'updatedAt', 'categories', 'products', 'variants', 'collections', 'code', 'used']) {
	@ApiProperty({ type: String, example: 'X90BJ0DIJV', required: false })
	@IsString()
	@IsOptional()
	code: string;
}

export class UpdateDiscountVoucherDto extends PartialType(CreateDiscountVoucherDto) {
}

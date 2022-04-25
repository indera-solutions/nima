import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ProductVariantEntity } from '../entities/product-variant.entity';

// export class ProductVariantDto extends OmitType(ProductVariantEntity, []){
export class ProductVariantDto extends ProductVariantEntity {
}

export class CreateProductVariantDto extends OmitType(ProductVariantDto, ['created', 'id', 'updatedAt', 'product']) {
	@ApiProperty({ type: Number })
	productId: number;
}

export class UpdateProductVariantDto extends PartialType(CreateProductVariantDto) {
}

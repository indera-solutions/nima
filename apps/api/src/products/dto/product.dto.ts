import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';

// export class ProductDto extends OmitType(ProductEntity, []) {
export class ProductDto extends ProductEntity {
}

export class CreateProductDto extends OmitType(ProductDto, ['id']) {
}

export class UpdateProductDto extends PartialType(ProductDto) {
}

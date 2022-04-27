import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductTypeEntity } from '../entities';

// export class ProductTypeDto extends OmitType(ProductTypeEntity, []) {
export class ProductTypeDto extends ProductTypeEntity {
}

export class CreateProductTypeDto extends OmitType(ProductTypeDto, ['id']) {
}

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {
}

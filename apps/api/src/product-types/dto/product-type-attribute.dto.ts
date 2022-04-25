import { OmitType } from '@nestjs/swagger';
import { ProductTypeAttributeEntity } from '../entities';

export class ProductTypeAttributeDto extends ProductTypeAttributeEntity {
}

export class CreateProductTypeAttributeDto extends OmitType(ProductTypeAttributeDto, ['id']) {
}

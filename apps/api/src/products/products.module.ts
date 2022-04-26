import { Module } from '@nestjs/common';
import {
	AssignedProductAttributeEntity,
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeEntity,
	AssignedProductVariantAttributeValueEntity,
} from './entities/product-attribute-assignment.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {
}

export const ProductsModuleEntities = [
	ProductEntity,
	ProductVariantEntity,
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
];

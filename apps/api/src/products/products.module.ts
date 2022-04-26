import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './entities/product-attribute-value-assignment.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

export const ProductsModuleEntities = [
	ProductEntity,
	ProductVariantEntity,
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
];

@Module({
	imports: [TypeOrmModule.forFeature(ProductsModuleEntities)],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {
}

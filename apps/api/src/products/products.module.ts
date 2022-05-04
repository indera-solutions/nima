import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypesModule } from '../product-types/product-types.module';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './entities/product-attribute-assignment.entity';
import { AssignedProductAttributeRepository } from './entities/product-attribute-assignment.repository';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './entities/product-attribute-value-assignment.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';
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

const ProductsModuleRepositories = [
	ProductRepository,
	AssignedProductAttributeRepository,
];

@Module({
	imports: [TypeOrmModule.forFeature(ProductsModuleRepositories), ProductTypesModule],
	controllers: [ProductsController],
	providers: [ProductsService],
	exports: [ProductsService],
})
export class ProductsModule {
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesModule } from '../attributes/attributes.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeRepository,
	AssignedProductVariantAttributeRepository,
} from './entities/product-attribute-assignment.repository';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './entities/product-attribute-value-assignment.entity';
import {
	AssignedProductAttributeValueRepository,
	AssignedProductVariantAttributeValueRepository,
} from './entities/product-attribute-value-assignment.repository';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductVariantRepository } from './entities/product-variant.repository';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from './product-variant.service';
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
	AssignedProductAttributeValueRepository,
	ProductVariantRepository,
	AssignedProductVariantAttributeValueRepository,
	AssignedProductVariantAttributeRepository,
];

@Module({
	imports: [TypeOrmModule.forFeature(ProductsModuleRepositories), ProductTypesModule, AttributesModule],
	controllers: [ProductsController, ProductVariantController],
	providers: [ProductsService, ProductVariantService],
	exports: [ProductsService, ProductVariantService],
})
export class ProductsModule {
}

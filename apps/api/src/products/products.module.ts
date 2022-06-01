import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesModule } from '../attributes/attributes.module';
import { CategoriesModule } from '../categories/categories.module';
import { DiscountsModule } from '../discounts/discounts.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './entities/product-attribute-value-assignment.entity';
import { ProductMediaEntity } from './entities/product-media.entity';
import { ProductVariantMediaEntity } from './entities/product-variant-media.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductEntity } from './entities/product.entity';
import { FilteringService } from './filtering.service';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from './product-variant.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {
	AssignedProductAttributeRepository,
	AssignedProductVariantAttributeRepository,
} from './repositories/product-attribute-assignment.repository';
import {
	AssignedProductAttributeValueRepository,
	AssignedProductVariantAttributeValueRepository,
} from './repositories/product-attribute-value-assignment.repository';
import { ProductMediaRepository } from './repositories/product-media.repository';
import { ProductVariantMediaRepository } from './repositories/product-variant-media.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { ProductRepository } from './repositories/product.repository';

export const ProductsModuleEntities = [
	ProductEntity,
	ProductMediaEntity,
	ProductVariantEntity,
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
	ProductVariantMediaEntity,

];

const ProductsModuleRepositories = [
	ProductRepository,
	AssignedProductAttributeRepository,
	AssignedProductAttributeValueRepository,
	ProductVariantRepository,
	AssignedProductVariantAttributeValueRepository,
	AssignedProductVariantAttributeRepository,
	ProductMediaRepository,
	ProductVariantMediaRepository,
];

@Module({
	imports: [TypeOrmModule.forFeature(ProductsModuleRepositories), ProductTypesModule, AttributesModule, CategoriesModule, forwardRef(() => DiscountsModule)],
	controllers: [ProductsController, ProductVariantController],
	providers: [ProductsService, ProductVariantService, FilteringService],
	exports: [ProductsService, ProductVariantService],
})
export class ProductsModule {
}

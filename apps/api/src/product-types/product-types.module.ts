import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesModule } from '../attributes/attributes.module';
import { ProductTypeAttributeEntity, ProductTypeEntity, ProductTypeVariantAttributeEntity } from './entities';
import { ProductTypesController } from './product-types.controller';
import {
	ProductTypeAttributeRepository,
	ProductTypeRepository,
	ProductTypeVariantAttributeRepository,
} from './repositories';
import { ProductTypeAttributesService } from './services/product-type-attributes.service';
import { ProductTypeVariantAttributesService } from './services/product-type-variant-attributes.service';
import { ProductTypesService } from './services/product-types.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProductTypeRepository,
			ProductTypeAttributeRepository,
			ProductTypeVariantAttributeRepository,
		]),
		AttributesModule,
	],
	controllers: [ProductTypesController],
	providers: [ProductTypesService, ProductTypeAttributesService, ProductTypeVariantAttributesService],
	exports: [ProductTypesService, ProductTypeAttributesService, ProductTypeVariantAttributesService],
})
export class ProductTypesModule {
}

export const ProductTypesModuleEntities = [ProductTypeEntity, ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity];

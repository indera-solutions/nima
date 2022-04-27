import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesModule } from '../attributes/attributes.module';
import { ProductTypeAttributeEntity, ProductTypeEntity, ProductTypeVariantAttributeEntity } from './entities';
import { ProductTypeAttributesController } from './product-type-attributes.controller';
import { ProductTypeAttributesService } from './product-type-attributes.service';
import { ProductTypeVariantAttributesController } from './product-type-variant-attributes.controller';
import { ProductTypeVariantAttributesService } from './product-type-variant-attributes.service';
import { ProductTypesController } from './product-types.controller';
import { ProductTypesService } from './product-types.service';
import {
	ProductTypeAttributeRepository,
	ProductTypeRepository,
	ProductTypeVariantAttributeRepository,
} from './repositories';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProductTypeRepository,
			ProductTypeAttributeRepository,
			ProductTypeVariantAttributeRepository,
		]),
		AttributesModule,
	],
	controllers: [ProductTypesController, ProductTypeAttributesController, ProductTypeVariantAttributesController],
	providers: [ProductTypesService, ProductTypeAttributesService, ProductTypeVariantAttributesService],
})
export class ProductTypesModule {
}

export const ProductTypesModuleEntities = [ProductTypeEntity, ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity];

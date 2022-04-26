import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	ProductTypeAttributeEntity,
	ProductTypeEntity,
	ProductTypeVariantAttributeEntity,
} from './entities';
import { ProductTypeAttributeService } from './product-type-attribute.service';
import { ProductTypeVariantAttributeService } from './product-type-variant-attribute.service';
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
	],
	controllers: [ProductTypesController],
	providers: [ProductTypesService, ProductTypeAttributeService, ProductTypeVariantAttributeService],
})
export class ProductTypesModule {
}

export const ProductTypesModuleEntities = [ProductTypeEntity, ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity];

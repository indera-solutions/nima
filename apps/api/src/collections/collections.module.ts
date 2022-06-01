import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { ProductsModule } from '../products/products.module';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionProductsEntity } from './entities/collection-products.entity';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionProductsRepository } from './repositories/collection-products.repository';
import { CollectionRepository } from './repositories/collection.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CollectionRepository, CollectionProductsRepository]), forwardRef(() => ProductsModule), CoreModule],
	controllers: [CollectionsController],
	providers: [CollectionsService],
	exports: [CollectionsService],
})
export class CollectionsModule {
}

export const CollectionsModuleEntities = [CollectionEntity, CollectionProductsEntity];

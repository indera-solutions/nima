import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionProductsEntity } from './entities/collection-products.entity';
import { CollectionEntity } from './entities/collection.entity';

@Module({
	imports: [TypeOrmModule.forFeature([CollectionEntity, CollectionProductsEntity])],
	controllers: [CollectionsController],
	providers: [CollectionsService],
})
export class CollectionsModule {
}

export const CollectionsModuleEntities = [CollectionEntity, CollectionProductsEntity];

import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService],
})
export class CategoriesModule {
}

export const CategoriesModuleEntities = [CategoryEntity];

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './entities/category.repository';

@Module({
	imports: [TypeOrmModule.forFeature([CategoryRepository]), CoreModule],
	controllers: [CategoriesController],
	providers: [CategoriesService],
	exports: [CategoriesService],
})
export class CategoriesModule {
}

export const CategoriesModuleEntities = [CategoryEntity];

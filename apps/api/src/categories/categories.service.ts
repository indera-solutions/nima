import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './entities/category.repository';

@Injectable()
export class CategoriesService {
	constructor(private categoryRepository: CategoryRepository) {
	}

	async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
		const { parentId, ...dto } = createCategoryDto;
		let parent: CategoryEntity = undefined;
		if ( parentId ) {
			parent = await this.findOne(parentId);
		}
		const res = await this.categoryRepository.save({ ...dto, parent: parent });
		return await this.findOne(res.id);
	}

	findAll() {
		return `This action returns all categories`;
	}

	async findOne(id: number): Promise<CategoryEntity> {
		const root = await this.categoryRepository.findOne({ where: { id: id } });
		const withChildren = await this.categoryRepository.findDescendantsTree(root);
		const ancestors = await this.categoryRepository.findAncestorsTree(root);
		console.dir(ancestors, { depth: 100 });
		return withChildren;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${ id } category`;
	}

	remove(id: number) {
		return `This action removes a #${ id } category`;
	}
}

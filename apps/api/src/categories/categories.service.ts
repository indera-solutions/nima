import { BadRequestException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
import { Like } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './entities/category.repository';

@Injectable()
export class CategoriesService {
	constructor(private categoryRepository: CategoryRepository) {
	}

	async create(params: { createCategoryDto: CreateCategoryDto }): Promise<CategoryEntity> {
		const { parentId, ...dto } = params.createCategoryDto;

		if ( !dto.slug || dto.slug.length === 0 ) {
			dto.slug = getSlug(dto.name.en); //TODO get default language from settings
		}

		const existingSlug = await this.categoryRepository.getBySlug(dto.slug);
		if ( existingSlug ) {
			const similarSlugCount = await this.categoryRepository.count({
				loadEagerRelations: false,
				where: {
					slug: Like(`${ dto.slug }%`),
				},
			});
			dto.slug = dto.slug + '-' + similarSlugCount;
		}

		let parent: CategoryEntity = undefined;
		if ( parentId ) {
			parent = await this.findOne({ id: parentId, depth: 0 });
		}
		const res = await this.categoryRepository.save({ ...dto, parent: parent });
		return await this.findOne({ id: res.id });
	}

	async findAll(params: { depth?: number }): Promise<CategoryEntity[]> {
		if ( params.depth === -1 ) {
			const allCategories = await this.categoryRepository.find();
			return allCategories;
		}
		const roots = await this.categoryRepository.findTrees({ depth: params.depth });
		return roots;

	}

	async findOne(params: { id: number, depth?: number }): Promise<CategoryEntity> {
		const root = await this.categoryRepository.findOne({ where: { id: params.id } });
		if ( !root ) throw new NotFoundException('CATEGORY_NOT_FOUND', `The category with id ${ params.id } is not found.`);
		if ( params.depth === 0 ) return root;
		return await this.categoryRepository.findDescendantsTree(root, { depth: params.depth });
	}

	async findAncestors(params: { id: number }): Promise<any> {
		const root = await this.categoryRepository.findOne({ where: { id: params.id } });
		return await this.categoryRepository.findAncestorsTree(root);
	}

	async update(params: { id: number, updateCategoryDto: UpdateCategoryDto }) {
		const existing = this.findOne({ id: params.id, depth: 0 });
		const partial = {
			...params.updateCategoryDto,
		};
		delete partial.parentId;
		await this.categoryRepository.update(params.id, partial);
		return this.findOne({ id: params.id });
	}

	async remove(params: { id: number, removeChildren?: boolean }) {
		const existing = await this.findOne({ id: params.id, depth: 1 });
		if ( existing.children.length > 0 ) {
			if ( params.removeChildren ) {
				throw new NotImplementedException('OPERATION_NOT_SUPPORTED.');
			} else {
				throw new BadRequestException('CATEGORY_WITH_CHILDREN', 'Can\'t delete a category with children. Please move them first or force delete');
			}
		}

		await this.categoryRepository.delete(params.id);
	}

	async listIdsOfChildren(params: { id: number }) {
		return await this.categoryRepository.listIdsOfChildren(params.id);
	}
}

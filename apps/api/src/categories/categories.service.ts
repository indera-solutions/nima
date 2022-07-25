import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
import { Like } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { MediaEntity } from '../core/entities/media.entity';
import { MediaService } from '../core/media/media.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './entities/category.repository';

@Injectable()
export class CategoriesService {
	constructor(private categoryRepository: CategoryRepository, private mediaService: MediaService) {
	}

	async create(params: { createCategoryDto: CreateCategoryDto }): Promise<CategoryEntity> {
		const { parentId, ...dto } = params.createCategoryDto;

		if ( !dto.slug || dto.slug.length === 0 ) {
			dto.slug = getSlug(dto.name.en || dto.name.el); //TODO get default language from settings
		}
		let backgroundImage: MediaEntity;
		if ( dto.backgroundImageId ) {
			backgroundImage = await this.mediaService.getById({ id: dto.backgroundImageId });
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
		delete dto.backgroundImageId;
		const res = await this.categoryRepository.save({ ...dto, backgroundImage: backgroundImage, parent: parent });
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

	async findOneBySlug(params: { slug: string, depth?: number }): Promise<CategoryEntity> {
		const root = await this.categoryRepository.findOne({ where: { slug: params.slug }, select: ['id'] });
		return this.findOne({
			id: root.id,
			depth: params.depth,
		});
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

		let backgroundImage: MediaEntity;
		if ( partial.backgroundImageId ) {
			backgroundImage = await this.mediaService.getById({ id: partial.backgroundImageId });
		}
		delete partial.backgroundImageId;

		await this.categoryRepository.update(params.id, {
			...partial,
			backgroundImage,
		});
		return this.findOne({ id: params.id });
	}

	@Transactional()
	async remove(params: { id: number, removeChildren?: boolean }) {
		const existing = await this.findOne({ id: params.id, depth: 1 });
		const productCount = await this.categoryRepository.getProductCountOfCategory(params.id);
		if ( productCount > 0 ) {
			throw new BadRequestException('CATEGORY_WITH_PRODUCTS', 'There are still products in category');
		}
		if ( existing.children.length > 0 ) {
			if ( params.removeChildren ) {
				for ( const child of existing.children ) {
					await this.remove({ id: child.id, removeChildren: params.removeChildren });
				}
			} else {
				throw new BadRequestException('CATEGORY_WITH_CHILDREN', 'Can\'t delete a category with children. Please move them first or force delete');
			}
		}

		await this.categoryRepository.delete(params.id);
		return existing;
	}

	async listIdsOfChildren(params: { id: number }) {
		return await this.categoryRepository.listIdsOfChildren(params.id);
	}

	async getAllIds(): Promise<number[]> {
		const res = await this.categoryRepository.find({ select: ['id'] });
		return res.map(r => r.id);
	}

	async getAllSlugs(): Promise<string[]> {
		const res = await this.categoryRepository.find({ select: ['slug'] });
		return res.map(r => r.slug);
	}
}

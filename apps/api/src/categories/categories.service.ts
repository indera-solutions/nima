import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	NotImplementedException,
} from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
	constructor(private categoryRepository: CategoryRepository) {
	}

	async create(params: { createCategoryDto: CreateCategoryDto }): Promise<number> {
		const { parentId, ...dto } = params.createCategoryDto;

		if ( !dto.slug || dto.slug.length === 0 ) {
			dto.slug = getSlug(dto.name.en); //TODO get default language from settings
		}

		const existingSlug = await this.categoryRepository.getBySlug(dto.slug);
		if ( existingSlug ) {
			throw new ConflictException('EXISTING_SLUG', 'This slug already exists. Try another one');
		}

		let parent: CategoryEntity = undefined;
		if ( parentId ) {
			parent = await this.findOne({ id: parentId, depth: 0 });
		}
		const res = await this.categoryRepository.insert({ ...dto, parent: parent });
		return res.identifiers[0].id;
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

	async update(params: { id: number, updateCategoryDto: UpdateCategoryDto }) {
		const existing = this.findOne({ id: params.id, depth: 0 });
		const partial = {
			...params.updateCategoryDto,
		};
		delete partial.parentId;
		return await this.categoryRepository.update(params.id, partial);
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

	async getDtos(ids?: number[]): Promise<CategoryDto[]> {
		const attributes = ids ? await this.categoryRepository.findByIds(ids) : await this.categoryRepository.find();
		return attributes.map(attributeValue => this.parseDto(attributeValue));
	}

	async getDto(id: number): Promise<CategoryDto> {
		const dtos = await this.getDtos([id]);
		if ( !dtos[0] ) throw new NotFoundException('CATEGORY_NOT_FOUND');
		return dtos[0];
	}

	parseDto(entity: CategoryEntity): CategoryDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			children: entity.children?.map(c => this.parseDto(c)) || [],
			privateMetadata: entity.privateMetadata,
			metadata: entity.metadata,
			description: entity.description,
			seoTitle: entity.seoTitle,
			seoDescription: entity.seoDescription,
		};
	}
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CategoryEntity } from '../entities/category.entity';

// export class CategoryDto extends OmitType(CategoryEntity, []) {
export class CategoryDto extends OmitType(CategoryEntity, ['parent', 'children']) {

	@ApiProperty({ type: [CategoryDto] })
	children: CategoryDto[];

	@ApiProperty({ type: CategoryDto, required: false, description: 'Only for ancestors query' })
	parent?: CategoryDto;

	static prepare(entity: CategoryEntity): CategoryDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			children: entity.children?.map(c => CategoryDto.prepare(c)) || [],
			parent: entity.parent ? CategoryDto.prepare(entity.parent) : undefined,
			privateMetadata: entity.privateMetadata,
			metadata: entity.metadata,
			description: entity.description,
			seoTitle: entity.seoTitle,
			seoDescription: entity.seoDescription,
		};
	}
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id', 'children', 'parent']) {
	@ApiProperty({ type: Number, example: 1, required: false })
	@IsNumber()
	@IsOptional()
	parentId?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { MediaDto } from '../../core/dto/media.dto';
import { CategoryEntity } from '../entities/category.entity';

// export class CategoryDto extends OmitType(CategoryEntity, []) {
export class CategoryDto extends OmitType(CategoryEntity, ['parent', 'children', 'backgroundImage']) {

	@ApiProperty({ type: () => MediaDto })
	backgroundImage?: MediaDto;

	@ApiProperty({ type: [CategoryDto] })
	children: CategoryDto[];

	@ApiProperty({ type: CategoryDto, required: false, description: 'Only for ancestors query' })
	parent?: CategoryDto;

	static prepare(entity: CategoryEntity, options?: { isAdmin?: boolean }): CategoryDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			children: entity.children?.map(c => CategoryDto.prepare(c)) || [],
			parent: entity.parent ? CategoryDto.prepare(entity.parent) : undefined,
			backgroundImage: entity.backgroundImage ? MediaDto.prepare(entity.backgroundImage) : undefined,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			metadata: entity.metadata,
			description: entity.description,
			seoTitle: entity.seoTitle,
			seoDescription: entity.seoDescription,
		};
	}
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id', 'children', 'parent', 'backgroundImage']) {
	@ApiProperty({ type: Number, example: 1, required: false })
	@IsNumber()
	@IsOptional()
	parentId?: number;

	@ApiProperty({ required: false })
	@IsInt()
	@IsOptional()
	backgroundImageId?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
}

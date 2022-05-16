import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { CategoryEntity } from '../entities/category.entity';

export class CategoryDto extends OmitType(CategoryEntity, ['parent', 'children']) {

	@ApiProperty({ type: [CategoryDto] })
	children: CategoryDto[];
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id', 'children']) {
	@ApiProperty({ type: Number, example: 1 })
	@IsNumber()
	@IsOptional()
	parentId?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
}

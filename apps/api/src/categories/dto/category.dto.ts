import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CategoryEntity } from '../entities/category.entity';

// export class CategoryDto extends OmitType(CategoryEntity, []) {
export class CategoryDto extends CategoryEntity {
}

export class CreateCategoryDto extends OmitType(CategoryDto, ['id', 'parent']) {
	@ApiProperty({ type: Number, example: 1 })
	parentId?: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
}

import { ApiProperty } from '@nestjs/swagger';
import { Category, Metadata, Translatable } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { CategoryDto } from '../dto/category.dto';

@Entity('categories_categories')
export class CategoryEntity implements Category {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Name' } })
	seoTitle: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Description' } })
	seoDescription: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Name' } })
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Description' } })
	description: Translatable;

	@Column()
	@ApiProperty({ type: String, example: 'category-name' })
	slug: string;

	@ManyToOne(() => CategoryEntity)
	@ApiProperty({ type: CategoryDto })
	parent: Category;
}

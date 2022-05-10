import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsNotEmptyObject, IsObject, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';

@Entity('categories_categories')
@Tree('closure-table')
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Name' } })
	@IsObject()
	seoTitle: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Description' } })
	@IsObject()
	seoDescription: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Name' } })
	@IsNotEmptyObject()
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Description' } })
	@IsObject()
	description: Translatable;

	@Column({ unique: true })
	@ApiProperty({ type: String, example: 'category-name' })
	@IsString()
	slug: string;

	@TreeParent()
	parent: CategoryEntity;

	@TreeChildren()
	children: CategoryEntity[];
}

import { Metadata, Category, Translatable } from '@nima/interfaces';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class CategoryEntity implements Category {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	seoTitle: Translatable;

	@Column({ type: 'jsonb', default: {} })
	seoDescription: Translatable;

	@Column({ type: 'jsonb', default: {} })
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	description: Translatable;

	@Column()
	slug: string;

	@ManyToOne(() => CategoryEntity)
	parent: Category;
}

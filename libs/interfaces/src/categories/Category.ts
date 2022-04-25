import { Metadata, Translatable } from '@nima/interfaces';

export interface Category {
	id: number;
	privateMetadata: Metadata;
	metadata: Metadata;
	seoTitle: Translatable;
	seoDescription: Translatable;
	name: Translatable;
	description: Translatable;
	slug: string;
	parent: Category;
}

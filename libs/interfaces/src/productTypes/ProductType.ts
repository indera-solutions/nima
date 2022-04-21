import { Metadata } from '@nima/interfaces';

export interface ProductType {
	id: number;
	name: string;
	hasVariants: boolean;
	isShippingRequired: boolean;
	weight: number;
	isDigital: boolean;
	metadata: Metadata;
	privateMetadata: Metadata;
	slug: string;
}

export interface ICreateProductTypeDto extends Omit<ProductType, 'id'> {
}

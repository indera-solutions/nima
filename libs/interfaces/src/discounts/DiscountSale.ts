import { Category, Metadata, Product, Translatable } from '@nima/interfaces';

export enum DiscountType {
	PERCENTAGE = 'PERCENTAGE',
	FLAT = 'FLAT',
}

export interface DiscountSale {
	id: number;
	name: Translatable;
	discountType: DiscountType;
	endDate?: string;
	startDate?: string;
	metadata: Metadata;
	privateMetadata: Metadata;
	created: string;
	updatedAt: string;
	categories: Category[];
	products: Product[];
	// collections
}

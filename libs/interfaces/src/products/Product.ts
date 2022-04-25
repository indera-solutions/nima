import { Metadata, Category, ProductType, Translatable } from '@nima/interfaces';

export interface Product {
	id: number;
	name: Translatable;
	description: Translatable;
	updatedAt: string;
	productType: ProductType;
	category: Category;
	seoDescription: string;
	seoTitle: string;
	chargeTaxes: boolean;
	weight: number;
	metadata: Metadata;
	privateMetadata: Metadata;
	slug: string;
	defaultVariant: number;
	descriptionPlaintext: string;
	rating: number;
	searchDocument: string;
	created: string;

	//Pricing
	isPublished: boolean;
	isVisibleInListings: boolean;
	isAvailableForPurchase: boolean;
	currency: string;
	minPrice: number;
}

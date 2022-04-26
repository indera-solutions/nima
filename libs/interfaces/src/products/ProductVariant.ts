import { Metadata, Translatable } from '@nima/interfaces';
import { Product } from './Product';

export interface ProductVariant {
	id: number;
	sku: string;
	name: Translatable;
	product: Product;
	weight?: number;
	metadata: Metadata;
	privateMetadata: Metadata;
	sortOrder?: number;
	isPreorder?: boolean;
	preorderEndDate?: string;
	preorderGlobalThreshold?: number;
	quantityLimitPerCustomer?: number;
	created: string;
	updatedAt: string;

	//Pricing
	currency: string;
	priceAmount?: number;
	costPriceAmount?: number;

	//Stock
	stock: number;
	trackInventory: boolean;
}

export interface CreateProductVariantDto extends Omit<ProductVariant, 'id' | 'product' | 'created' | 'updatedAt'> {
	productId: number;
}

import { Attribute } from '../attributes';
import { ProductType } from './ProductType';

export interface ProductTypeAttribute {
	id: number;
	attribute: Attribute;
	productType: ProductType;
	sortOrder: number;
}

export interface ICreateProductTypeAttributeDto extends Omit<ProductTypeAttribute, 'id' | 'productType' | 'attribute'> {
	attributeId: number;
}

export interface ProductTypeVariantAttribute {
	id: number;
	attribute: Attribute;
	productType: ProductType;
	sortOrder: number;
	variantSelection: boolean;
}

export interface ICreateProductTypeVariantAttributeDto extends Omit<ProductTypeVariantAttribute, 'id' | 'productType' | 'attribute'> {
	attributeId: number;
}

export interface IAttributesOfProductType {
	attributes: ProductTypeAttribute[],
	variantAttributes: ProductTypeVariantAttribute[]
}

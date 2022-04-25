import { AttributeValue, Product, ProductTypeAttribute, ProductTypeVariantAttribute } from '@nima/interfaces';
import { ProductVariant } from './ProductVariant';


export interface AssignedProductAttribute {
	id: number;
	product: Product;
	productTypeAttribute: ProductTypeAttribute;
}

export interface CreateAssignedProductAttributeDto {
	productTypeAttributeId: number;
	productId: number;
}

export interface AssignedProductAttributeValue {
	id: number;
	sortOrder: number;
	assignedProductAttribute: AssignedProductAttribute;
	value: AttributeValue;
}

export interface CreateAssignedProductAttributeValueDto {
	sortOrder: number;
	attributeValueId: number;
	assignedProductAttributeId: number;
}

export interface AssignedProductVariantAttribute {
	id: number;
	variant: ProductVariant;
	productTypeVariantAttribute: ProductTypeVariantAttribute;
}

export interface CreateAssignedProductVariantAttributeDto {
	productTypeVariantAttributeId: number;
	variantId: number;
}

export interface AssignedProductVariantAttributeValue {
	id: number;
	sortOrder: number;
	assignedProductVariantAttribute: AssignedProductVariantAttribute;
	value: AttributeValue;
}

export interface CreateAssignedProductVariantAttributeValueDto {
	sortOrder: number;
	attributeValueId: number;
	assignedProductVariantAttributeId: number;
}

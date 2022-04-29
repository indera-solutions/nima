const NIMA_QUERY_PREFIX = 'COMMERCE_V2';
const SETTINGS_QUERY_PREFIX = 'SETTINGS';
const CATEGORIES_QUERY_PREFIX = 'CATEGORIES';
const ATTRIBUTES_QUERY_PREFIX = 'ATTRIBUTES';
const PRODUCT_TYPES_QUERY_PREFIX = 'PRODUCT_TYPES';
const PRODUCTS_QUERY_PREFIX = 'PRODUCTS';
const ORDERS_QUERY_PREFIX = 'ORDERS';
const CART_QUERY_PREFIX = 'CART';
const CHECKOUT_QUERY_PREFIX = 'CHECKOUT';

export const NimaQueryCacheKeys = {
	settings: [SETTINGS_QUERY_PREFIX],
	attributes: {
		all: [NIMA_QUERY_PREFIX, ATTRIBUTES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.attributes.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.attributes.all, 'ID', id] as const,
		values: (id?: number) => [...NimaQueryCacheKeys.attributes.all, 'ID', id, 'VALUES'] as const,
	},
	// productTypes: {
	// 	all: [NIMA_QUERY_PREFIX, PRODUCT_TYPES_QUERY_PREFIX] as const,
	// 	list: () => [...NimaQueryCacheKeys.productTypes.all, 'LIST'] as const,
	// 	id: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id] as const,
	// 	attributes: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id, 'ATTRIBUTES'] as
	// const,
	// 	variantAttributes: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id,
	// 'VARIANT_ATTRIBUTES'] as const, }, categories: { all: [NIMA_QUERY_PREFIX, CATEGORIES_QUERY_PREFIX] as const,
	// list: () => [...NimaQueryCacheKeys.categories.all, 'LIST'] as const, id: (id?: number) =>
	// [...NimaQueryCacheKeys.categories.all, 'ID', id] as const, // products: (id?: number, filters?: any) =>
	// [...NimaQueryCacheKeys.categories.all, 'ID', id, 'PRODUCTS', // filters || {}] as const, fields: (id?:
	// number) => [...NimaQueryCacheKeys.categories.all, 'ID', id, // 'FIELDS'] as const, }, products: { all:
	// [NIMA_QUERY_PREFIX, PRODUCTS_QUERY_PREFIX] as const, list: (pageSize: number, pageNumber: number) =>
	// [...NimaQueryCacheKeys.products.all, 'LIST', pageSize, pageNumber] as const, id: (id?: number) =>
	// [...NimaQueryCacheKeys.products.all, 'ID', id] as const, listVariants: (id?: number) =>
	// [...NimaQueryCacheKeys.products.all, 'ID', id, 'VARIANTS'] as const, listAttributes: (id?: number) =>
	// [...NimaQueryCacheKeys.products.all, 'ID', id, 'ATTRIBUTES'] as const, listVariantAttributes: (id?:
	// number, variantId?: number) => [...NimaQueryCacheKeys.products.all, 'ID', id, 'VARIANTS', variantId,
	// 'ATTRIBUTES'] as const, listVariantAttributesValue: (id?: number, variantId?: number,
	// assignedVariantAttributeId?: number) => [...NimaQueryCacheKeys.products.all, 'ID', id, 'VARIANTS',
	// variantId, 'ATTRIBUTES', assignedVariantAttributeId, 'VALUES'] as const, }, orders: { all: [NIMA_QUERY_PREFIX,
	// ORDERS_QUERY_PREFIX] as const, list: (pageSize: number, pageNumber: number) =>
	// [...NimaQueryCacheKeys.orders.all, 'LIST', pageSize, pageNumber] as const, id: (id?: string) =>
	// [...NimaQueryCacheKeys.orders.all, 'ID', id] as const, // number: (id?: number) =>
	// [...NimaQueryCacheKeys.orders.all, 'NUMBER', id] as const, }, cart: { all: [NIMA_QUERY_PREFIX,
	// CART_QUERY_PREFIX] as const, uuid: (uuid?: string) => [...NimaQueryCacheKeys.cart.all, 'LIST', 'UUID',
	// uuid] as const, }, checkout: { all: [NIMA_QUERY_PREFIX, CHECKOUT_QUERY_PREFIX] as const, cost: (params:
	// Partial<Address> & { total: number }) => [...NimaQueryCacheKeys.checkout.all, 'SHIPPING_COST', params] as const,
	// },
};

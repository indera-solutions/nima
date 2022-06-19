import { ProductsApiProductsFindAllRequest } from '@nima-cms/sdk';

const NIMA_QUERY_PREFIX = 'COMMERCE_V2';
const SETTINGS_QUERY_PREFIX = 'SETTINGS';
const CATEGORIES_QUERY_PREFIX = 'CATEGORIES';
const COLLECTION_QUERY_PREFIX = 'COLLECTIONS';
const SALES_QUERY_PREFIX = 'SALES';
const VOUCHERS_QUERY_PREFIX = 'VOUCHERS';
const ATTRIBUTES_QUERY_PREFIX = 'ATTRIBUTES';
const PRODUCT_TYPES_QUERY_PREFIX = 'PRODUCT_TYPES';
const PRODUCTS_QUERY_PREFIX = 'PRODUCTS';
const MEDIA_QUERY_PREFIX = 'MEDIA';
const ORDERS_QUERY_PREFIX = 'ORDERS';
const ADDRESS_QUERY_PREFIX = 'ADDRESS';
const CHECKOUT_QUERY_PREFIX = 'CHECKOUT';
const SHIPPING_ZONES_QUERY_PREFIX = 'SHIPPING_ZONES';

export const NimaQueryCacheKeys = {
	settings: [SETTINGS_QUERY_PREFIX],
	attributes: {
		all: [NIMA_QUERY_PREFIX, ATTRIBUTES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.attributes.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.attributes.all, 'ID', id] as const,
		values: (id?: number) => [...NimaQueryCacheKeys.attributes.all, 'ID', id, 'VALUES'] as const,
	},
	productTypes: {
		all: [NIMA_QUERY_PREFIX, PRODUCT_TYPES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.productTypes.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id] as const,
		attributes: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id, 'ATTRIBUTES'] as const,
		variantAttributes: (id?: number) => [...NimaQueryCacheKeys.productTypes.all, 'ID', id, 'VARIANT_ATTRIBUTES'] as const,
	},
	categories: {
		all: [NIMA_QUERY_PREFIX, CATEGORIES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.categories.all, 'LIST'] as const,
		flat: () => [...NimaQueryCacheKeys.categories.all, 'FLAT'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.categories.all, 'ID', id] as const,
		ancestors: (id?: number) => [...NimaQueryCacheKeys.categories.all, 'ANCESTORS', id] as const,
	},
	collections: {
		all: [NIMA_QUERY_PREFIX, COLLECTION_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.collections.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.collections.all, 'ID', id] as const,
		products: (id?: number) => [...NimaQueryCacheKeys.collections.all, 'ID', id, 'PRODUCTS'] as const,
	},
	sales: {
		all: [NIMA_QUERY_PREFIX, SALES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.sales.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.sales.all, 'ID', id] as const,
	},
	vouchers: {
		all: [NIMA_QUERY_PREFIX, VOUCHERS_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.vouchers.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.vouchers.all, 'ID', id] as const,
	},
	products: {
		all: [NIMA_QUERY_PREFIX, PRODUCTS_QUERY_PREFIX] as const,
		list: (options: ProductsApiProductsFindAllRequest) => [...NimaQueryCacheKeys.products.all, 'LIST', options] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.products.all, 'ID', id] as const,
		listVariants: (id?: number) => [...NimaQueryCacheKeys.products.all, 'ID', id, 'VARIANTS'] as const,
		variant: (id?: number, variantId?: number) => [...NimaQueryCacheKeys.products.all, 'ID', id, 'VARIANTS', variantId] as const,
	},
	media: {
		all: [NIMA_QUERY_PREFIX, MEDIA_QUERY_PREFIX] as const,
		list: (options: { page?: number, pageSize?: number }) => [...NimaQueryCacheKeys.media.all, 'LIST', options] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.media.all, 'ID', id] as const,

	},
	checkout: {
		all: [NIMA_QUERY_PREFIX, CHECKOUT_QUERY_PREFIX] as const,
		current: () => [...NimaQueryCacheKeys.checkout.all] as const,
	},
	shipping: {
		all: [NIMA_QUERY_PREFIX, SHIPPING_ZONES_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.shipping.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.shipping.all, 'ID', id] as const,
		zones: (id?: number) => [...NimaQueryCacheKeys.shipping.all, 'ID', id, 'ZONES'] as const,
	},
	orders: {
		all: [NIMA_QUERY_PREFIX, ORDERS_QUERY_PREFIX] as const,
		list: (params: any) => [...NimaQueryCacheKeys.orders.all, 'LIST', params] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.orders.all, 'ID', id] as const,
	},
	address: {
		all: [NIMA_QUERY_PREFIX, ADDRESS_QUERY_PREFIX] as const,
		list: () => [...NimaQueryCacheKeys.address.all, 'LIST'] as const,
		id: (id?: number) => [...NimaQueryCacheKeys.address.all, 'ID', id] as const,
	},
};


const queryString = require('query-string');

const BASE = '';
const ATTRIBUTES_INDEX = BASE + '/attributes';
const PRODUCT_TYPES_INDEX = BASE + '/product-types';
const PRODUCTS_INDEX = BASE + '/products';
const CATEGORIES_INDEX = BASE + '/categories';
const MEDIA_INDEX = BASE + '/media';
const SETTINGS_INDEX = BASE + '/settings';
const SHIPPING_INDEX = BASE + '/shipping';
const ORDERS_INDEX = BASE + '/orders';
const COLLECTIONS_INDEX = BASE + '/collections';
const SALES_INDEX = BASE + '/sales';
const COUPONS_INDEX = BASE + '/coupons';

function appendQuery(q: any): string {
	const str: string = queryString.stringify(q, {
		skipNull: true,
	});
	return str.length === 0 ? '' : '?' + str;
}

export const NIMA_ROUTES = {
	attributes: {
		list: ATTRIBUTES_INDEX,
		add: () => NIMA_ROUTES.attributes.list + '/add',
		edit: (id: string | number) => NIMA_ROUTES.attributes.list + '/add' + appendQuery({ id }),
	},
	productTypes: {
		list: PRODUCT_TYPES_INDEX,
		add: () => NIMA_ROUTES.productTypes.list + '/add',
		edit: (id: string | number) => NIMA_ROUTES.productTypes.list + '/add' + appendQuery({ id }),
	},
	categories: {
		list: CATEGORIES_INDEX,
		add: (parentId?: string | number) => NIMA_ROUTES.categories.list + '/add' + appendQuery({ parentId }),
		edit: (id: string | number, parentId?: string | number) => NIMA_ROUTES.categories.list + '/add' + appendQuery({ id, parentId }),
	},
	collections: {
		list: COLLECTIONS_INDEX,
		add: (parentId?: string | number) => NIMA_ROUTES.collections.list + '/add' + appendQuery({ parentId }),
		edit: (id: string | number, parentId?: string | number) => NIMA_ROUTES.collections.list + '/add' + appendQuery({ id, parentId }),
	},
	sales: {
		list: SALES_INDEX,
		add: (parentId?: string | number) => NIMA_ROUTES.sales.list + '/add' + appendQuery({ parentId }),
		edit: (id: string | number, parentId?: string | number) => NIMA_ROUTES.sales.list + '/add' + appendQuery({ id, parentId }),
	},
	vouchers: {
		list: COUPONS_INDEX,
		add: (parentId?: string | number) => NIMA_ROUTES.vouchers.list + '/add' + appendQuery({ parentId }),
		edit: (id: string | number, parentId?: string | number) => NIMA_ROUTES.vouchers.list + '/add' + appendQuery({ id, parentId }),
	},
	products: {
		list: PRODUCTS_INDEX,
		add: () => PRODUCTS_INDEX + '/add',
		import: () => PRODUCTS_INDEX + '/import',
		edit: (id: string | number) => PRODUCTS_INDEX + '/add' + appendQuery({ id }),
		createVariant: (id: string | number) => PRODUCTS_INDEX + '/variants' + appendQuery({ productId: id }),
		editVariant: (id: string | number, variantId) => PRODUCTS_INDEX + '/variants' + appendQuery({ productId: id, variantId }),
	},
	media: {
		index: MEDIA_INDEX,
	},
	shipping: {
		list: SHIPPING_INDEX,
		add: () => NIMA_ROUTES.shipping.list + '/add',
		edit: (id: string | number) => NIMA_ROUTES.shipping.list + '/add' + appendQuery({ id }),
	},
	orders: {
		list: ORDERS_INDEX,
		add: () => NIMA_ROUTES.orders.list + '/add',
		view: (id: string | number) => NIMA_ROUTES.orders.list + '/view' + appendQuery({ id }),
	},
	settings: {
		index: SETTINGS_INDEX,
	},

};

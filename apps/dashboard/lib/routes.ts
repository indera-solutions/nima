const BASE = '';
const ATTRIBUTES_INDEX = BASE + '/attributes';
const PRODUCT_TYPES_INDEX = BASE + '/product-types';
const PRODUCTS_INDEX = BASE + '/products';
const SETTINGS_INDEX = BASE + '/settings';

export const NIMA_ROUTES = {
	attributes: {
		list: ATTRIBUTES_INDEX,
		add: () => NIMA_ROUTES.attributes.list + '/add',
		edit: (id: string | number) => NIMA_ROUTES.attributes.list + '/add?id=' + id,
	},
	productTypes: {
		list: PRODUCT_TYPES_INDEX,
		add: () => NIMA_ROUTES.productTypes.list + '/add',
		edit: (id: string | number) => NIMA_ROUTES.productTypes.list + '/add?id=' + id,
	},
	products: {
		list: PRODUCTS_INDEX,
		add: () => NIMA_ROUTES.products.list + '/add',
		import: () => NIMA_ROUTES.products.list + '/import',
		edit: (id: string | number) => NIMA_ROUTES.products.list + '/add?id=' + id,
		createVariant: (id: string | number) => NIMA_ROUTES.products.list + '/' + id + '/variants/add',
	},
	settings: {
		index: SETTINGS_INDEX,
	},

};

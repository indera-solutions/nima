const queryString = require('query-string');

const BASE = '';
const ATTRIBUTES_INDEX = BASE + '/attributes';
const PRODUCT_TYPES_INDEX = BASE + '/product-types';
const PRODUCTS_INDEX = BASE + '/products';
const CATEGORIES_INDEX = BASE + '/categories';
const SETTINGS_INDEX = BASE + '/settings';

function appendQuery(q: any): string {
	const str: string = queryString.stringify(q, {
		skipNull: true,
	});
	return str.length === 0 ? '' : '?' + str;
	// if(Object.keys(q).length===0)
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
	products: {
		list: PRODUCTS_INDEX,
		add: () => NIMA_ROUTES.products.list + '/add',
		import: () => NIMA_ROUTES.products.list + '/import',
		edit: (id: string | number) => NIMA_ROUTES.products.list + '/add' + appendQuery({ id }),
		createVariant: (id: string | number) => NIMA_ROUTES.products.list + '/' + id + '/variants/add',
	},
	settings: {
		index: SETTINGS_INDEX,
	},

};

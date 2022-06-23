import { NavigationItem } from '../components';
import { STRINGS } from '../strings/strings';
import { NIMA_ROUTES } from './routes';

export const adminRoutes: NavigationItem[] = [
	{
		name: STRINGS.PRODUCTS,
		link: NIMA_ROUTES.products.list,
	},
	{
		name: STRINGS.ATTRIBUTES,
		link: NIMA_ROUTES.attributes.list,
	},
	{
		name: STRINGS.PRODUCT_TYPES,
		link: NIMA_ROUTES.productTypes.list,
	},
	{
		name: STRINGS.CATEGORIES,
		link: NIMA_ROUTES.categories.list,
	},
	{
		name: STRINGS.COLLECTIONS,
		link: NIMA_ROUTES.collections.list,
	},
	{
		name: STRINGS.SALES,
		link: NIMA_ROUTES.sales.list,
	},
	{
		name: STRINGS.COUPONS,
		link: NIMA_ROUTES.vouchers.list,
	},
	{
		name: STRINGS.MEDIA,
		link: NIMA_ROUTES.media.index,
	},
	{
		name: STRINGS.SHIPPING,
		link: NIMA_ROUTES.shipping.list,
	},
	{
		name: STRINGS.ORDERS,
		link: NIMA_ROUTES.orders.list,
	},
	{
		name: STRINGS.USERS,
		link: NIMA_ROUTES.users.list,
	},
	{
		name: STRINGS.SETTINGS,
		link: NIMA_ROUTES.settings.index,
	},

	// {
	// 	name: 'Orders',
	// 	link: '/admin/orders',
	// },
];

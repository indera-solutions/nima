import { NavigationItem } from '../components';
import { NIMA_ROUTES } from './routes';

export const adminRoutes: NavigationItem[] = [
	{
		name: 'Products',
		link: NIMA_ROUTES.products.list,
	},
	{
		name: 'Attributes',
		link: NIMA_ROUTES.attributes.list,
	},
	{
		name: 'Product Types',
		link: NIMA_ROUTES.productTypes.list,
	},
	{
		name: 'Categories',
		link: NIMA_ROUTES.categories.list,
	},
	{
		name: 'Collections',
		link: NIMA_ROUTES.collections.list,
	},
	{
		name: 'Sales',
		link: NIMA_ROUTES.sales.list,
	},
	{
		name: 'Media',
		link: NIMA_ROUTES.media.index,
	},
	{
		name: 'Shipping',
		link: NIMA_ROUTES.shipping.list,
	},
	{
		name: 'Orders',
		link: NIMA_ROUTES.orders.list,
	},
	{
		name: 'Settings',
		link: NIMA_ROUTES.settings.index,
	},

	// {
	// 	name: 'Orders',
	// 	link: '/admin/orders',
	// },
];

import { NavigationItem } from '../components';
import { NIMA_ROUTES } from './routes';

export const adminRoutes: NavigationItem[] = [
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
		name: 'Products',
		link: NIMA_ROUTES.products.list,
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

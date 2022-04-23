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
		name: 'Products',
		link: NIMA_ROUTES.products.list,
	},
	// {
	// 	name: 'Orders',
	// 	link: '/admin/orders',
	// },
];

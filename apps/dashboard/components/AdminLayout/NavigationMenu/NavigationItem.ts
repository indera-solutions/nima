import { Translatable } from '@nima-cms/utils';

export interface NavigationItem {
	name: string | Translatable;
	link: string;
	disable?: boolean;
	children?: Omit<NavigationItem, 'children'>[];
}

export interface NavigationItem {
	name: string;
	link: string;
	disable?: boolean;
	children?: Omit<NavigationItem, 'children'>[];
}

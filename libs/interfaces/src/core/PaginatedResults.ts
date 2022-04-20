export type GenericFilter<T> = {
	key: keyof T, value: string, operation?: '=' | '>' | '<'
} | {
	key: keyof T, value: string[], operation?: 'BETWEEN'
}

export interface PaginatedResults<T> {
	items: T[];
	totalCount: number;
	pageSize: number;
	pageNumber: number;
}

export interface BasePaginatedRequest {
	page: number;
	itemsPerPage: number;
}

export interface SearchPaginatedRequest extends BasePaginatedRequest {
	searchTerm: string;
}

export interface FilterPaginatedRequest<T> extends BasePaginatedRequest {
	filterOn?: GenericFilter<T>[],
	orderBy?: { key: keyof T, index: number, order: 'ASC' | 'DESC' }[],
	categoryId?: number
}

export function stringifyFilter(filter: { key: string, value: string, operation?: '=' | '>' | '<' } | { key: string, value: string[], operation?: 'BETWEEN' }): string {
	if ( filter.operation === 'BETWEEN' ) return `${ filter.key }#${ filter.operation || '=' }#${ filter.value.join('#') }`;
	return `${ filter.key }#${ filter.operation || '=' }#${ filter.value }`;
}

export function parseFilter<T>(filter: string): GenericFilter<T> {
	const [key, operation, ...value] = filter.split('#');
	if ( operation !== '=' && operation !== '>' && operation !== '<' && operation !== 'BETWEEN' ) throw '2';
	if ( operation === 'BETWEEN' ) return {
		key: key as keyof T,
		operation: operation,
		value: value,
	};
	return {
		key: key as keyof T,
		operation: operation,
		value: value[0],
	};
}

export function stringifyOrder(filter: { key: string, index: number, order: 'ASC' | 'DESC' }): string {
	return `${ filter.index }#${ filter.key }#${ filter.order }`;
}

export function parseOrder<T>(filter: string): { key: keyof T, index: number, order: 'ASC' | 'DESC' } {
	const [_index, key, order] = filter.split('#');
	if ( order !== 'ASC' && order !== 'DESC' ) throw 'INVALID_ORDER';
	const index = Number(_index);
	if ( isNaN(index) ) throw new Error('INDEX_IS_NaN');
	return {
		key: key as keyof T,
		order: order,
		index: index,
	};
}

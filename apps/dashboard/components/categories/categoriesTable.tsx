import { Trans } from '@nima/react';
import { CategoryDto } from '@nima/sdk';
import Link from 'next/link';
import React from 'react';
import { NIMA_ROUTES } from '../../lib/routes';

interface CategoriesTableProps {
	categories: CategoryDto[];
	parentId?: number;
}

export function CategoriesTable(props: CategoriesTableProps) {
	return <div className="overflow-x-auto">
		<table className="table w-full">
			<thead>
			<tr>
				<th>Name</th>
				<th>Slug</th>
				<th>Subcategories</th>
				<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{ props.categories.map(attribute => <tr key={ attribute.id } className={ 'hover' }>
				<td><Trans>{ attribute.name }</Trans></td>
				<td>{ attribute.slug }</td>
				<td>{ attribute.children.length }</td>
				<td>
					<Link href={ NIMA_ROUTES.categories.edit(attribute.id, props.parentId) + '#admin-page' }>
						<button className={ 'btn btn-primary' }>Edit</button>
					</Link>
				</td>
			</tr>) }
			</tbody>
		</table>
	</div>;

}

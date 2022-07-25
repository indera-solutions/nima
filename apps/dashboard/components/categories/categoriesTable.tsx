import { Trans, useTranslations } from '@nima-cms/react';
import { CategoryDto } from '@nima-cms/sdk';
import Link from 'next/link';
import React from 'react';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface CategoriesTableProps {
	categories: CategoryDto[];
	parentId?: number;
}

export function CategoriesTable(props: CategoriesTableProps) {
	const { getAdminTranslation } = useTranslations();

	return <div className="overflow-x-auto">
		<table className="table w-full">
			<thead>
			<tr>
				<th><Trans caps>{ STRINGS.NAME }</Trans></th>
				<th><Trans caps>{ STRINGS.SLUG }</Trans></th>
				<th><Trans caps>{ STRINGS.SUBCATEGORIES }</Trans></th>
				<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
			</tr>
			</thead>
			<tbody>
			{ props.categories
				   .sort((a, b) => (getAdminTranslation(a.name).localeCompare(getAdminTranslation(b.name))))
				   .map(attribute => <tr key={ attribute.id } className={ 'hover' }>
					   <td><Trans>{ attribute.name }</Trans></td>
					   <td>{ attribute.slug }</td>
					   <td>{ attribute.children.length }</td>
					   <td>
						   <Link href={ NIMA_ROUTES.categories.edit(attribute.id, props.parentId) + '#admin-page' }>
							   <button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans></button>
						   </Link>
					   </td>
				   </tr>) }
			</tbody>
		</table>
	</div>;

}

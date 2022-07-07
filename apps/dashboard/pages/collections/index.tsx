import { Trans, useCollections, useTranslations } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface CategoriesListProps {

}

export default function CollectionList(props: CategoriesListProps) {
	const { data: collections } = useCollections();
	const { getAdminTranslation } = useTranslations();

	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.COLLECTIONS) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.COLLECTIONS) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (collections?.length || 0) + ' ' + getAdminTranslation(STRINGS.COLLECTIONS).toLowerCase() }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.collections.add() }>
							<a className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.SLUG }</Trans></th>
								<th><Trans caps>{ STRINGS.NUMBER_OF_PRODUCTS }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ (collections || []).map(collection => <tr key={ collection.id } className={ 'hover' }>
								<td><Trans>{ collection.name }</Trans></td>
								<td>{ collection.slug }</td>
								<td>{ collection.products?.length || -1 }</td>
								<td>
									<Link href={ NIMA_ROUTES.collections.edit(collection.id) }>
										<button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans></button>
									</Link>
								</td>
							</tr>) }
							</tbody>
						</table>
					</div>
				</AdminSection>
			</AdminColumn>
		</AdminPage>
	</>;
}

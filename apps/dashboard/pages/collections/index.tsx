import { Trans, useCollections } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface CategoriesListProps {

}

export default function CollectionList(props: CategoriesListProps) {
	const { data: collections } = useCollections();

	return <>
		<NimaTitle title={ 'Collections' }/>
		<AdminPage
			label={ 'Collections' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (collections?.length || 0) + ' collections' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.collections.add() }>
							<a className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Name</th>
								<th>Slug</th>
								<th>No. of Products</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (collections || []).map(collection => <tr key={ collection.id } className={ 'hover' }>
								<td><Trans>{ collection.name }</Trans></td>
								<td>{ collection.slug }</td>
								<td>{ collection.products?.length || -1 }</td>
								<td>
									<Link href={ NIMA_ROUTES.collections.edit(collection.id) }>
										<button className={ 'btn btn-primary' }>Edit</button>
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

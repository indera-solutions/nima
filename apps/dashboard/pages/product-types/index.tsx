import { useProductTypes } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface ProductTypesListProps {

}

export default function ProductTypesList(props: ProductTypesListProps) {
	const { data: productTypes } = useProductTypes();

	return <>
		<NimaTitle title={ 'Product Types' }/>
		<AdminPage
			label={ 'Product Types' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (productTypes?.length || 0) + ' product types' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.productTypes.add() }>
							<a
								className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Name</th>
								<th>Slug</th>
								<th>Has Variants</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (productTypes || []).map(attribute => <tr key={ attribute.id } className={ 'hover' }>
								<td>{ attribute.name }</td>
								<td>{ attribute.slug }</td>
								<td>{ attribute.hasVariants ? 'Yes' : 'No' }</td>
								<td>
									<Link href={ NIMA_ROUTES.productTypes.edit(attribute.id) }>
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

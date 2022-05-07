import { Trans } from '@nima/react';
import Link from 'next/link';
import React from 'react';
import { useProducts } from '../../../../libs/react/src/reactQuery/products.queries';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface ProductListProps {

}

export default function ProductList(props: ProductListProps) {
	const { data: productsResponse } = useProducts({
		page: 1,
		itemsPerPage: 20,
	});

	return <>
		<NimaTitle title={ 'Products' }/>
		<AdminPage
			label={ 'Products' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (productsResponse?.totalCount || 0) + ' products' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.products.add() }>
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
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (productsResponse?.items || []).map(product => <tr key={ product.id }
																				 className={ 'hover' }>
								<td><Trans>{ product.name }</Trans></td>
								<td>{ product.slug }</td>
								<td>
									<Link href={ NIMA_ROUTES.products.edit(product.id) }>
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
};

import { Trans, useSales } from '@nima-cms/react';
import { DiscountType } from '@nima-cms/sdk';
import { getEuroValue, toTitleCase } from '@nima-cms/utils';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface SalesListProps {

}

export default function SalesList(props: SalesListProps) {
	const { data: sales } = useSales();

	return <>
		<NimaTitle title={ 'Sales' }/>
		<AdminPage
			label={ 'Sales' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (sales?.length || 0) + ' sales' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.sales.add() }>
							<a className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Value</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (sales || []).map(sale => <tr key={ sale.id } className={ 'hover' }>
								<td><Trans>{ sale.name }</Trans></td>
								<td>{ toTitleCase(sale.discountType) }</td>
								<td>{ sale.discountType === DiscountType.FLAT ? getEuroValue(sale.discountValue) : (sale.discountValue + '%') }</td>
								<td>
									<Link href={ NIMA_ROUTES.sales.edit(sale.id) }>
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

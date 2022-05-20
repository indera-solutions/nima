import { useOrders } from '@nima-cms/react';
import { getEuroValue, toTitleCase } from '@nima-cms/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface AttributeListProps {

}

export default function AttributeList(props: AttributeListProps) {
	const { data: paginatedResult } = useOrders();
	const orders = paginatedResult?.items || [];

	return <>
		<NimaTitle title={ 'Orders' }/>
		<AdminPage
			label={ 'Orders' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (paginatedResult?.totalCount || 0) + ' orders' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.orders.add() }>
							<a className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Date</th>
								<th>Email</th>
								<th>Total</th>
								<th>Status</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ orders.map(order => <tr key={ order.id } className={ 'hover' }>
								<td>{ dayjs(order.created).format('DD/MM/YYYY HH:mm') }</td>
								<td>{ order.userEmail }</td>
								<td>{ getEuroValue(order.totalGrossAmount) }</td>
								<td>{ toTitleCase(order.status) }</td>
								<td>
									<Link href={ NIMA_ROUTES.orders.view(order.id) }>
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

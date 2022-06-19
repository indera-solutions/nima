import { useOrders } from '@nima-cms/react';
import { OrderDto, OrderStatus } from '@nima-cms/sdk';
import { enumToArray, getEuroValue, toTitleCase } from '@nima-cms/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import React from 'react';
import Select from 'react-select';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { Pagination } from '../../components/utils/Pagination';
import { NIMA_ROUTES } from '../../lib/routes';

interface AttributeListProps {

}

const types = enumToArray(OrderStatus);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));
const ITEMS_PER_PAGE = 20;

export default function AttributeList(props: AttributeListProps) {
	const router = useRouter();
	const page = (+router.query['page'] || 1) as number;
	const status = router.query['status'] ? OrderStatus[router.query['status'] as string] : undefined;

	const { data: paginatedResult } = useOrders({
		status,
		page,
		itemsPerPage: ITEMS_PER_PAGE,
	});
	const orders = paginatedResult?.items || [];

	async function onPageSelect(page: number) {
		const q: string = queryString.stringify({
			page: page,
		}, {
			skipNull: true,
		});
		await router.push(router.pathname + '?' + q, undefined, {});
	}

	async function changeUrl(params: {
		page: number,
		status?: OrderStatus
	}) {
		const q: string = queryString.stringify({
			page: params.page,
			status: params.status,
		}, {
			skipNull: true,
		});
		await router.push(router.pathname + '?' + q, undefined, {});
	}

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
					<div className="flex">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Status</span>

							</label>
							<Select
								isClearable
								value={ typesDropdown.find(value => value.value === status) }
								options={ typesDropdown }
								styles={ { menu: styles => ({ ...styles, zIndex: 100 }) } }
								onChange={ (e) => {
									changeUrl({
										page: page,
										status: e?.value ? OrderStatus[e.value] : undefined,
									});
								} }
							/>
						</div>
					</div>
				</AdminSection>
				<AdminSection>
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
								<td><OrderStatusBadge status={ order.status }/></td>
								<td>
									<Link href={ NIMA_ROUTES.orders.view(order.id) }>
										<a className={ 'btn btn-primary' }>Edit</a>
									</Link>
								</td>
							</tr>) }
							</tbody>
						</table>
						{ paginatedResult && ITEMS_PER_PAGE < paginatedResult.totalCount && <Pagination
							onPageSelect={ (newPage) => {
								changeUrl({
									page: newPage,
									status: status,
								});
							} }
							page={ page }
							itemsPerPage={ ITEMS_PER_PAGE }
							totalItems={ paginatedResult?.totalCount || 0 }
						/> }
					</div>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}


function OrderStatusBadge(props: { status: OrderDto['status'] }) {
	switch ( props.status ) {
		case OrderStatus.FULFILLED:
			return <div className="badge badge-success gap-2">
				{ toTitleCase(props.status) }
			</div>;
		case OrderStatus.UNCONFIRMED:
		case OrderStatus.UNFULFILLED:
			return <div className="badge badge-warning gap-2">
				{ toTitleCase(props.status) }
			</div>;
		case OrderStatus.CANCELED:
			return <div className="badge badge-error gap-2">
				{ toTitleCase(props.status) }
			</div>;
		default:
			return <div className="badge badge-info gap-2">
				{ toTitleCase(props.status) }
			</div>;

	}
}

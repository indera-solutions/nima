import { Trans, useVouchers } from '@nima-cms/react';
import { DiscountType, DiscountVoucherDto } from '@nima-cms/sdk';
import { getEuroValue, toTitleCase } from '@nima-cms/utils';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface SalesListProps {

}

export default function SalesList(props: SalesListProps) {
	const { data: vouchers } = useVouchers();

	return <>
		<NimaTitle title={ 'Vouchers' }/>
		<AdminPage
			label={ 'Vouchers' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (vouchers?.length || 0) + ' sales' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.vouchers.add() }>
							<a className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Name</th>
								<th>Code</th>
								<th>Type</th>
								<th>Value</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (vouchers || [] as DiscountVoucherDto[]).map(voucher => <tr key={ voucher.id }
																						  className={ 'hover' }>
								<td><Trans>{ voucher.name }</Trans></td>
								<td>{ voucher.code }</td>
								<td>{ toTitleCase(voucher.discountValueType) }</td>
								<td>{ voucher.discountValueType === DiscountType.FLAT ? getEuroValue(voucher.discountValue) : voucher.discountValueType === DiscountType.PERCENTAGE ? (voucher.discountValue + '%') : undefined }</td>
								<td>
									<Link href={ NIMA_ROUTES.vouchers.edit(voucher.id) }>
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

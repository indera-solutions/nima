import { Trans, useTranslations, useVouchers } from '@nima-cms/react';
import { DiscountType, DiscountVoucherDto } from '@nima-cms/sdk';
import { getEuroValue, toTitleCase } from '@nima-cms/utils';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface SalesListProps {

}

export default function SalesList(props: SalesListProps) {
	const { data: vouchers } = useVouchers();
	const { getAdminTranslation } = useTranslations();


	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.COUPONS) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.COUPONS) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (vouchers?.length || 0) + ' ' + getAdminTranslation(STRINGS.COUPONS) }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.vouchers.add() }>
							<a className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.CODE }</Trans></th>
								<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
								<th><Trans caps>{ STRINGS.VALUE }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
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

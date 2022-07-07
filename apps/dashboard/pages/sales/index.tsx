import { Trans, useSales, useTranslations } from '@nima-cms/react';
import { DiscountType } from '@nima-cms/sdk';
import { getEuroValue } from '@nima-cms/utils';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface SalesListProps {

}

export default function SalesList(props: SalesListProps) {
	const { data: sales } = useSales();
	const { getAdminTranslation } = useTranslations();

	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.SALES) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.SALES) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (sales?.length || 0) + ' ' + getAdminTranslation(STRINGS.SALES).toLowerCase() }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.sales.add() }>
							<a className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
								<th><Trans caps>{ STRINGS.VALUE }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ (sales || []).map(sale => <tr key={ sale.id } className={ 'hover' }>
								<td><Trans>{ sale.name }</Trans></td>
								<td><Trans>{ STRINGS[sale.discountType] }</Trans></td>
								<td>{ sale.discountType === DiscountType.FLAT ? getEuroValue(sale.discountValue) : (sale.discountValue + '%') }</td>
								<td>
									<Link href={ NIMA_ROUTES.sales.edit(sale.id) }>
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

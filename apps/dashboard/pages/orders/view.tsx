import { Trans, useOrderById, useTranslations } from '@nima-cms/react';
import { getEuroValue, parseIdStr, toTitleCase } from '@nima-cms/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { AddressView } from '../../components/orders/AddressView';
import { EditOrderStatusModal } from '../../components/orders/EditStatusModal';
import { STRINGS } from '../../strings/strings';

interface ViewOrderProps {

}

export default function ViewOrder(props: ViewOrderProps) {

	const router = useRouter();
	const { getAdminTranslation } = useTranslations();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;

	const { data: order } = useOrderById(id);

	const [editStatusModal, setEditStatusModal] = useState(false);

	if ( !order ) return 'Loading..';
	return (
		<>
			<NimaTitle title={ getAdminTranslation(STRINGS.ORDER) + ' #' + order.id }/>
			<AdminPage
				label={ getAdminTranslation(STRINGS.ORDER) + ' #' + order.id }
			>
				<AdminColumn>
					<div className="flex gap-6 w-full">
						<AddressView addressId={ order.shippingAddress.id }
									 title={ getAdminTranslation(STRINGS.SHIPPING_ADDRESS) }/>
						<AddressView addressId={ order.billingAddress.id }
									 title={ getAdminTranslation(STRINGS.BILLING_ADDRESS) }/>
					</div>
					<AdminSection title={ getAdminTranslation(STRINGS.ITEMS) }>
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.SKU }</Trans></th>
								<th><Trans caps>{ STRINGS.QUANTITY }</Trans></th>
								<th><Trans caps>{ STRINGS.PRICE_PER_ITEM }</Trans></th>
								<th><Trans caps>{ STRINGS.TOTAL }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ order.lines.map(line => <tr key={ line.id } className={ 'hover' }>
								<td><Trans>{ line.variantName }</Trans></td>
								<td>{ line.productSku }</td>
								<td>{ line.quantity }</td>
								<td>{ getEuroValue(line.totalPriceGrossAmount / line.quantity) }</td>
								<td>{ getEuroValue(line.totalPriceGrossAmount) }</td>
							</tr>) }

							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong><Trans>{ STRINGS.SUBTOTAL }</Trans>:</strong></td>
								<td>{ getEuroValue(order.undiscountedTotalGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong><Trans>{ STRINGS.SALE }</Trans>:</strong></td>
								<td>{ getEuroValue(order.totalGrossAmount - order.shippingPriceGrossAmount - order.undiscountedTotalGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong><Trans>{ STRINGS.SHIPPING }</Trans>:</strong></td>
								<td>{ getEuroValue(order.shippingPriceGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong><Trans>{ STRINGS.TOTAL }</Trans>:</strong></td>
								<td>{ getEuroValue(order.totalGrossAmount) }</td>
							</tr>
							</tbody>
						</table>
					</AdminSection>

					<AdminSection title={ getAdminTranslation(STRINGS.HISTORY) }>
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.DATE }</Trans></th>
								<th><Trans caps>{ STRINGS.EVENT }</Trans></th>
								<th><Trans caps>{ STRINGS.PARAMS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ order.events
								   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
								   .map((event, index) => <tr key={ index } className={ 'hover' }>
									   <td>{ dayjs(event.date).format('DD/MM/YYYY HH:mm') }</td>
									   <td>{ toTitleCase(event.eventType) }</td>
									   <td>{ JSON.stringify(event.parameters) }</td>
								   </tr>) }
							</tbody>
						</table>
					</AdminSection>

					{/*<MetadataEditor values={ createAttributeDto.metadata as Metadata }*/ }
					{/*				onChange={ (v => onValueEdit('metadata', v)) }/>*/ }
					{/*<MetadataEditor isPrivate values={ createAttributeDto.privateMetadata as Metadata }*/ }
					{/*				onChange={ (v => onValueEdit('privateMetadata', v)) }/>*/ }
				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.OVERVIEW) }>
						<h2>
							<Trans>{ STRINGS.DATE }</Trans>: <strong>{ dayjs(order.created).format('DD/MM/YYYY HH:mm') }</strong>
						</h2>
						<h2><Trans>{ STRINGS.STATUS }</Trans>: <div className={ 'flex justify-between' }>
							<strong>{ toTitleCase(order.status) }</strong>
							<button onClick={ () => setEditStatusModal(true) }
									className={ 'btn btn-primary btn-sm' }><Trans>{ STRINGS.EDIT }</Trans>
							</button>
						</div>
						</h2>
						<h2><Trans>{ STRINGS.SHIPPING_METHOD }</Trans>: <strong>{ order.shippingMethodName }</strong>
						</h2>
						{/*<h2>Payment Method: <strong>{ toTitleCase(order.paymentMethod) }</strong></h2>*/ }
						{/*{ order.voucher_id && <h2>Voucher code: <strong>{ order.voucher_id }</strong></h2> }*/ }
					</AdminSection>
					<AdminSection title={ getAdminTranslation(STRINGS.CUSTOMER) }>
						<h2>{ order.userEmail }</h2>
					</AdminSection>


					<AdminSection title={ getAdminTranslation(STRINGS.NOTES) }>
						<p>
							{ order.customerNote }
						</p>
					</AdminSection>
				</AdminColumn>
			</AdminPage>
			{ editStatusModal && <EditOrderStatusModal order={ order } onClose={ () => setEditStatusModal(false) }/> }
		</>
	);
}

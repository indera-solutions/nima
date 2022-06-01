import { Trans, useOrderById } from '@nima-cms/react';
import { InputType } from '@nima-cms/sdk';
import { enumToArray, getEuroValue, parseIdStr, toTitleCase } from '@nima-cms/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { AddressView } from '../../components/orders/AddressView';

interface AddAttributeProps {

}

const types = enumToArray(InputType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));

export default function ViewOrder(props: AddAttributeProps) {

	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;

	const { data: order } = useOrderById(id);

	console.log(order);

	if ( !order ) return 'Loading..';
	return (
		<>
			<NimaTitle title={ 'Order #' + order.id }/>
			<AdminPage
				label={ 'Order #' + order.id }
			>
				<AdminColumn>
					<div className="flex gap-6 w-full">
						<AddressView addressId={ order.shippingAddress.id } title={ 'Shipping Address' }/>
						<AddressView addressId={ order.billingAddress.id } title={ 'Billing Address' }/>
					</div>
					<AdminSection title={ 'Items' }>
						<table className="table w-full">
							<thead>
							<tr>
								<th>Name</th>
								<th>SKU</th>
								<th>Quantity</th>
								<th>Price per item</th>
								<th>Total</th>
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
								<td><strong>Subtotal:</strong></td>
								<td>{ getEuroValue(order.undiscountedTotalGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong>Discount:</strong></td>
								<td>{ getEuroValue(order.totalGrossAmount - order.shippingPriceGrossAmount - order.undiscountedTotalGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong>Shipping:</strong></td>
								<td>{ getEuroValue(order.shippingPriceGrossAmount) }</td>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td><strong>Total:</strong></td>
								<td>{ getEuroValue(order.totalGrossAmount) }</td>
							</tr>
							</tbody>
						</table>
					</AdminSection>

					{/*<MetadataEditor values={ createAttributeDto.metadata as Metadata }*/ }
					{/*				onChange={ (v => onValueEdit('metadata', v)) }/>*/ }
					{/*<MetadataEditor isPrivate values={ createAttributeDto.privateMetadata as Metadata }*/ }
					{/*				onChange={ (v => onValueEdit('privateMetadata', v)) }/>*/ }
				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ 'Overview' }>
						<h2>Date: <strong>{ dayjs(order.created).format('DD/MM/YYYY HH:mm') }</strong></h2>
						<h2>Status: <strong>{ toTitleCase(order.status) }</strong></h2>
						<h2>Shipping Method: <strong>{ order.shippingMethodName }</strong></h2>
						{/*<h2>Payment Method: <strong>{ toTitleCase(order.paymentMethod) }</strong></h2>*/ }
						{ order.voucher_id && <h2>Voucher code: <strong>{ order.voucher_id }</strong></h2> }
					</AdminSection>
					<AdminSection title={ 'Customer' }>
						<h2>{ order.userEmail }</h2>
					</AdminSection>


					<AdminSection title={ 'Notes' }>
						<p>
							{ order.customerNote }
						</p>
					</AdminSection>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
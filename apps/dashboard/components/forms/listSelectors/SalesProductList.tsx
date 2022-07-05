import { Trans, useCategoryId, useProductById, useProductTypeId, useTranslations } from '@nima-cms/react';
import { ProductDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { STRINGS } from '../../../strings/strings';
import { AdminSection } from '../../AdminLayout';
import { ProductImage } from '../../products/ProductImage';
import { SalesAddProducts } from './SalesAddProducts';

interface SalesProductListProps {
	products: ProductDto[];
	onSave: (ids: number[]) => void;
	onRemove: (id: number) => void;
}

export function SalesProductList(props: SalesProductListProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const { getAdminTranslation } = useTranslations();

	return (
		<>
			<AdminSection title={ getAdminTranslation(STRINGS.PRODUCTS) }
						  titleRightContainer={ <button onClick={ () => setModalOpen(true) }
														className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD }</Trans>
						  </button> }>
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th><Trans caps>{ STRINGS.IMAGE }</Trans></th>
							<th><Trans caps>{ STRINGS.NAME }</Trans></th>
							<th><Trans caps>{ STRINGS.CATEGORY }</Trans></th>
							<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
							<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
						</tr>
						</thead>
						<tbody>
						{ (props.products || []).map(product => <SaleProductTableItem
							productId={ product.id }
							onRemove={ props.onRemove }
							key={ product.id }/>) }
						</tbody>
					</table>
				</div>
			</AdminSection>
			{ modalOpen && <SalesAddProducts
				onClose={ () => setModalOpen(false) }
				existingProducts={ props.products || [] }
				onSave={ props.onSave }
			/> }
		</>
	);
}

function SaleProductTableItem(props: { productId: number, onRemove: (id: number) => void; }) {
	const { data: product } = useProductById(props.productId);
	const { data: category } = useCategoryId(product?.categoryId);
	const { data: type } = useProductTypeId(product?.productTypeId);

	if ( !product || !category || !type ) return;

	return <tr className={ 'hover' }>
		<td><ProductImage product={ product }/></td>
		<td><Trans>{ product.name }</Trans></td>
		<td><Trans>{ category.name }</Trans></td>
		<td><Trans>{ type.name }</Trans></td>
		<td>
			<button className={ 'btn btn-error' } onClick={ () => props.onRemove(props.productId) }>
				<Trans>{ STRINGS.REMOVE }</Trans></button>
		</td>
	</tr>;
}

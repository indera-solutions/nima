import {
	Trans,
	useCategoryId,
	useProductById,
	useProductTypeId,
	useRemoveProductFromCollectionMutation,
	useTranslations,
} from '@nima-cms/react';
import { CreateCollectionProductDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { STRINGS } from '../../strings/strings';
import { AdminSection } from '../AdminLayout';
import { ProductImage } from '../products/ProductImage';
import { CollectionAddProducts } from './CollectionAddProducts';

interface ProductListProps {
	collectionId: number;
	products: CreateCollectionProductDto[];
}

export function CollectionProductList(props: ProductListProps) {
	const { getAdminTranslation } = useTranslations();

	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<AdminSection title={ getAdminTranslation(STRINGS.PRODUCT_LIST) }
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
						{ (props.products || []).map(product => <CollectionProductTableItem
							productId={ product.productId } collectionId={ props.collectionId }
							key={ product.productId }/>) }
						</tbody>
					</table>
				</div>
			</AdminSection>
			{ modalOpen && <CollectionAddProducts
				onClose={ () => setModalOpen(false) }
				existingProducts={ props.products || [] }
				collectionId={ props.collectionId }
			/> }
		</>
	);
}

function CollectionProductTableItem(props: { productId: number, collectionId: number }) {
	const { data: product } = useProductById(props.productId);
	const { data: category } = useCategoryId(product?.categoryId);
	const { data: type } = useProductTypeId(product?.productTypeId);
	const removeProductFromCollectionMutation = useRemoveProductFromCollectionMutation();

	async function removeProduct() {
		await removeProductFromCollectionMutation.mutateAsync({
			collectionId: props.collectionId,
			productId: props.productId,
		});
	}

	if ( !product || !category || !type ) return;

	return <tr className={ 'hover' }>
		<td><ProductImage product={ product }/></td>
		<td><Trans>{ product.name }</Trans></td>
		<td><Trans>{ category.name }</Trans></td>
		<td><Trans>{ type.name }</Trans></td>
		<td>
			<button className={ 'btn btn-error' } onClick={ removeProduct }><Trans>{ STRINGS.REMOVE }</Trans></button>
		</td>
	</tr>;
}

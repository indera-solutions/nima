import {
	Trans,
	useCategoryId,
	useProductById,
	useProductTypeId,
	useRemoveProductFromCollectionMutation,
} from '@nima-cms/react';
import { CreateCollectionProductDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { ProductImage } from '../products/ProductImage';
import { CollectionAddProducts } from './CollectionAddProducts';

interface ProductListProps {
	collectionId: number;
	products: CreateCollectionProductDto[];
}

export function CollectionProductList(props: ProductListProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<AdminSection title={ 'Product List' }
						  titleRightContainer={ <button onClick={ () => setModalOpen(true) }
														className={ 'btn btn-primary' }>Add</button> }>
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th>Img</th>
							<th>Name</th>
							<th>Category</th>
							<th>Type</th>
							<th>Actions</th>
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
			<button className={ 'btn btn-error' } onClick={ removeProduct }>Remove</button>
		</td>
	</tr>;
}

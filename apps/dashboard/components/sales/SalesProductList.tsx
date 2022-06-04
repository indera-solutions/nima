import {
	Trans,
	useCategoryId,
	useProductById,
	useProductTypeId,
	useRemoveProductFromSaleMutation,
} from '@nima-cms/react';
import { ProductDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { ProductImage } from '../products/ProductImage';
import { SalesAddProducts } from './SalesAddProducts';

interface SalesProductListProps {
	id: number;
	products: ProductDto[];
}

export function SalesProductList(props: SalesProductListProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<AdminSection title={ 'Products' }
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
						{ (props.products || []).map(product => <SaleProductTableItem
							productId={ product.id } saleId={ props.id }
							key={ product.id }/>) }
						</tbody>
					</table>
				</div>
			</AdminSection>
			{ modalOpen && <SalesAddProducts
				onClose={ () => setModalOpen(false) }
				existingProducts={ props.products || [] }
				saleId={ props.id }
			/> }
		</>
	);
}

function SaleProductTableItem(props: { productId: number, saleId: number }) {
	const { data: product } = useProductById(props.productId);
	const { data: category } = useCategoryId(product?.categoryId);
	const { data: type } = useProductTypeId(product?.productTypeId);
	const removeProductFromSaleMutation = useRemoveProductFromSaleMutation();

	async function removeProduct() {
		await removeProductFromSaleMutation.mutateAsync({
			id: props.saleId,
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

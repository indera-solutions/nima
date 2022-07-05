import { Trans, useCategoryId, useProducts, useProductTypeId } from '@nima-cms/react';
import { ProductDto } from '@nima-cms/sdk';
import React, { useMemo, useState } from 'react';
import { STRINGS } from '../../../strings/strings';
import { ProductImage } from '../../products/ProductImage';

interface SalesAddProductsProps {
	onSave: (ids: number[]) => void;
	existingProducts: ProductDto[];
	onClose: () => void;
}

export function SalesAddProducts(props: SalesAddProductsProps) {
	const { data: products } = useProducts({});
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const existingIds = useMemo(() => {
		return props.existingProducts.map(e => e.id);
	}, [props.existingProducts]);

	function onToggle(id: number) {
		setSelectedIds(state => {
			const temp = Array.from(state);
			if ( state.includes(id) ) {
				temp.splice(temp.indexOf(id), 1);
			} else {
				temp.push(id);
			}
			return temp;
		});
	}

	async function onSave() {
		props.onSave(selectedIds);
		props.onClose();
	}

	return (
		<>
			<div className="modal modal-open">
				<div className="modal-box">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg"><Trans>{ STRINGS.ADD_PRODUCTS }</Trans></h3>
					<div className="py-4">
						<div className={ 'flex gap-4' }>
							<table className="table w-full">
								<thead>
								<tr>
									<th></th>
									<th><Trans caps>{ STRINGS.IMAGE }</Trans></th>
									<th><Trans caps>{ STRINGS.NAME }</Trans></th>
									<th><Trans caps>{ STRINGS.CATEGORY }</Trans></th>
									<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ (products?.items || [])
									.filter(product => !existingIds.includes(product.id))
									.map(product => <CollectionAddProductListItem
										key={ product.id }
										selected={ selectedIds.includes(product.id) }
										onToggle={ onToggle }
										product={ product }/>) }
								</tbody>
							</table>

						</div>
					</div>
					<div className="modal-action">
						<label className="btn btn-success" onClick={ onSave }>
							<Trans>{ STRINGS.ADD_PRODUCTS }</Trans>
						</label>
					</div>
				</div>
			</div>
		</>
	);
}

function CollectionAddProductListItem(props: {
	product: ProductDto,
	selected: boolean,
	onToggle: (id: number) => void
}) {
	const { product } = props;
	const { data: category } = useCategoryId(product?.categoryId);
	const { data: type } = useProductTypeId(product?.productTypeId);
	if ( !product || !category || !type ) return;
	return <tr className={ 'hover' }>
		<td><input
			type="checkbox"
			className={ 'checkbox' }
			checked={ props.selected }
			onChange={ () => props.onToggle(props.product.id) }
		/></td>
		<td><ProductImage product={ product }/></td>
		<td><Trans>{ product.name }</Trans></td>
		<td><Trans>{ category.name }</Trans></td>
		<td><Trans>{ type.name }</Trans></td>
	</tr>;
}

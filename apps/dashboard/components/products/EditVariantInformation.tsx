import { CreateProductVariantDto } from '@nima/sdk';
import React from 'react';
import { AdminSection } from '../AdminLayout';

interface EditVariantInformationProps {
	state: CreateProductVariantDto,
	onValueEdit: (value: any, name: string) => void
}

export function EditVariantInformation(props: EditVariantInformationProps) {
	const { onValueEdit, state } = props;

	return <>
		<AdminSection title={ 'Prices' }>
			<label className="label">
				<span className="label-text">Price</span>
			</label>
			<input type="number" placeholder="SKU" className="input input-bordered w-full max-w-xs"
				   value={ state.priceAmount }
				   onChange={ (e) => onValueEdit(e.target.value, 'priceAmount') }
				   name={ 'priceAmount' }/>
		</AdminSection>
		<AdminSection title={ 'Inventory' }>
			<label className="label">
				<span className="label-text">SKU</span>
			</label>
			<input type="text" placeholder="SKU" className="input input-bordered w-full max-w-xs"
				   value={ state.sku }
				   onChange={ (e) => onValueEdit(e.target.value, 'sku') }
				   name={ 'SKU' }/>

			<label className="label">
				<span className="label-text">Stock Quantity</span>
			</label>
			<input type="number" min={ 0 } placeholder="0" className="input input-bordered w-full max-w-xs"
				   value={ state.stock || 0 }
				   onChange={ (e) => onValueEdit(e.target.value, 'stock') }
				   name={ 'stock' }/>


			<label className="label cursor-pointer justify-start gap-3">
				<input type="checkbox" className="checkbox" checked={ state.trackInventory || false }
					   onChange={ (e) => onValueEdit(e.target.checked, 'trackInventory') }/>
				<span className="label-text">Track Inventory</span>
			</label>
		</AdminSection>
	</>;
}

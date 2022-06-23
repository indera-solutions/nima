import { Trans, useSettings, useTranslations } from '@nima-cms/react';
import { CreateProductVariantDto } from '@nima-cms/sdk';
import React from 'react';
import { STRINGS } from '../../strings/strings';
import { AdminSection } from '../AdminLayout';

interface EditVariantInformationProps {
	state: CreateProductVariantDto,
	onValueEdit: (name: keyof CreateProductVariantDto, value: any) => void
}

export function EditVariantInformation(props: EditVariantInformationProps) {
	const { getEditingTranslation, getAdminTranslation } = useTranslations();

	const { onValueEdit, state } = props;
	const { data: settings } = useSettings();

	return <>
		<AdminSection title={ getAdminTranslation(STRINGS.PRICE) }>
			<label className="label">
				<span className="label-text"><Trans>{ STRINGS.PRICE }</Trans></span>
			</label>
			<input type="number" placeholder="0€" className="input input-bordered w-full max-w-xs"
				   value={ state.priceAmount || '' }
				   onChange={ (e) => onValueEdit('priceAmount', +e.target.value) }
				   name={ 'priceAmount' }/>
		</AdminSection>
		<AdminSection title={ getAdminTranslation(STRINGS.INVENTORY) }>
			<label className="label">
				<span className="label-text">SKU</span>
			</label>
			<input type="text" placeholder="SKU" className="input input-bordered w-full max-w-xs"
				   value={ state.sku || '' }
				   onChange={ (e) => onValueEdit('sku', e.target.value) }
				   name={ 'SKU' }/>

			<label className="label">
				<span className="label-text"><Trans>{ STRINGS.STOCK_QUANTITY }</Trans></span>
			</label>
			<input type="number" min={ 0 } placeholder="0" className="input input-bordered w-full max-w-xs"
				   value={ state.stock || 0 }
				   onChange={ (e) => onValueEdit('stock', +e.target.value) }
				   name={ 'stock' }/>

			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text"><Trans>{ STRINGS.STOCK_THRESHOLD }</Trans></span>
				</label>
				<input type="number" min={ 0 }
					   placeholder={ getAdminTranslation(STRINGS.DEFAULT(settings?.globalStockThreshold || 0)) }
					   className="input input-bordered w-full max-w-xs"
					   value={ state.stockThreshold || '' }
					   onChange={ (e) => onValueEdit('stockThreshold', +e.target.value) }
					   name={ 'stockThreshold' }/>
				<label className="label">
					<span className="label-text"><Trans>{ STRINGS.DEFAULT(settings?.globalStockThreshold || 0) }</Trans></span>
					<span className="label-text-alt"><Trans>{ STRINGS.NOTIFY_WHEN_STOCK_BELOW }</Trans></span>
				</label>
			</div>

			<label className="label cursor-pointer justify-start gap-3">
				<input type="checkbox" className="checkbox" checked={ state.trackInventory || false }
					   onChange={ (e) => onValueEdit('trackInventory', e.target.checked) }/>
				<span className="label-text"><Trans>{ STRINGS.TRACK_INVENTORY }</Trans></span>
			</label>
		</AdminSection>
	</>;
}

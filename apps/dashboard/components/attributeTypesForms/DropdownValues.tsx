import { Trans, useLanguages } from '@nima-cms/react';
import { AttributeValueDto, CreateAttributeValueDto } from '@nima-cms/sdk';
import { getSlug, Translatable } from '@nima-cms/utils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SVGPencil, SVGTrashCan } from '../../assets/SVGIcons';
import { AdminSection } from '../AdminLayout';
import { TranslatableInput } from '../forms';

interface DropdownValuesProps {
	onValueCreate?: (value: CreateAttributeValueDto) => void;
	onValueRemove?: (value: AttributeValueDto | CreateAttributeValueDto) => void;
	onValueUpdate?: (value: AttributeValueDto | CreateAttributeValueDto, oldSlug: string) => void;
	values: (AttributeValueDto | CreateAttributeValueDto)[];
}

export function DropdownValues(props: DropdownValuesProps) {
	const router = useRouter();
	const languages = useLanguages();
	const [editingValue, setEditingValue] = useState<AttributeValueDto | CreateAttributeValueDto | undefined>(undefined);
	const [newValue, setNewValue] = useState<Translatable>({});
	const [newSlug, setNewSlug] = useState<string | undefined>();

	function onValueCreate() {
		if ( !props.onValueCreate ) return;
		const attributeValue: CreateAttributeValueDto = {
			name: { ...newValue },
			slug: newSlug,
		};
		props.onValueCreate(attributeValue);
		setNewValue({});
		setNewSlug(undefined);
		setEditingValue(undefined);
	}

	function onEditInit(value: AttributeValueDto | CreateAttributeValueDto) {
		setNewValue(value.name);
		setNewSlug(value.slug);
		setEditingValue(value);
		router.push('#editingForm');
	}

	function onEdit() {
		if ( !editingValue ) return;
		setNewValue({});
		setNewSlug(undefined);
		setEditingValue(undefined);
		props.onValueUpdate({
			...editingValue,
			name: newValue,
			slug: newSlug,
		}, editingValue.slug);
	}

	return (
		<AdminSection title={ 'Attribute Values' }>
			<div className={ 'p-5' }>
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
						<tr>
							<th>Name</th>
							<th>Slug</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>

						{ props.values.map(value => <tr key={ value.slug }>
							<th><Trans useEditingLanguage>{ value.name }</Trans></th>
							<th>{ value.slug }</th>
							<th className={ 'flex gap-2' }>
								<button className={ 'btn btn-primary' } onClick={ () => onEditInit(value) }>
									<SVGPencil width={ '20' } height={ '20' } stroke={ 'white' }/>
								</button>
								<button className={ 'btn btn-error' } onClick={ () => props.onValueRemove(value) }>
									<SVGTrashCan width={ '20' } height={ '20' } stroke={ 'white' }/>

								</button>
							</th>
						</tr>) }

						</tbody>
					</table>
				</div>
				{ props.onValueCreate &&
					<div id="editingForm" className={ 'flex align-bottom gap-2  items-end justify-between' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">New Value</span>
							</label>
							<TranslatableInput
								value={ newValue }
								onChange={ setNewValue }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Slug</span>
							</label>
							<input type="text" className="input input-bordered w-full max-w-xs"
								   value={ newSlug || '' }
								   placeholder={ getSlug(newValue['en'] || '') }
								   onChange={ (e) => setNewSlug(e.target.value) }/>
						</div>
						{ editingValue ?
							<button className={ 'btn btn-success' } onClick={ onEdit }>Update Value</button> :
							<button className={ 'btn btn-success' } onClick={ onValueCreate }>Add Value</button> }
					</div> }
			</div>
		</AdminSection>
	);
}

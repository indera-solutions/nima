import { Trans, useLanguages } from '@nima-cms/react';
import { AttributeValueDto, CreateAttributeValueDto } from '@nima-cms/sdk';
import { Translatable } from '@nima-cms/utils';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { TranslatableInput } from '../forms';

interface DropdownValuesProps {
	onValueCreate?: (value: CreateAttributeValueDto) => void;
	values: (AttributeValueDto | CreateAttributeValueDto)[];
}

export function DropdownValues(props: DropdownValuesProps) {
	const languages = useLanguages();
	const [newValue, setNewValue] = useState<Translatable>({});

	function onValueCreate() {
		if ( !props.onValueCreate ) return;
		const attributeValue: CreateAttributeValueDto = {
			name: { ...newValue },
		};
		props.onValueCreate(attributeValue);
		setNewValue({});
	}

	return (
		<AdminSection title={ 'Attribute Values' }>
			<div className={ 'p-5' }>
				<div className="overflow-x-auto">
					<table className="table table-zebra w-full">
						<thead>
						<tr>
							<th>Name</th>

						</tr>
						</thead>
						<tbody>

						{ props.values.map(value => <tr key={ value.slug }>
							<th><Trans useEditingLanguage>{ value.name }</Trans></th>
						</tr>) }

						</tbody>
					</table>
				</div>
				{ props.onValueCreate && <div className={ 'flex align-bottom  items-end justify-between' }>
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
					<button className={ 'btn btn-success' } onClick={ onValueCreate }>Add Value</button>
				</div> }
			</div>
		</AdminSection>
	);
}

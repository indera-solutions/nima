import { AttributeValueDto, CreateAttributeValueDto, InputType } from '@nima-cms/sdk';
import React from 'react';
import { AdminSection } from '../AdminLayout';
import { DropdownValues } from './DropdownValues';

interface AttributeValuesFormProps {
	type: InputType;
	values: (AttributeValueDto | CreateAttributeValueDto)[];
	onValueCreate?: (value: CreateAttributeValueDto) => void;
	onValueRemove?: (value: AttributeValueDto | CreateAttributeValueDto) => void;
	onValueUpdate?: (value: AttributeValueDto | CreateAttributeValueDto, oldSlug: string) => void;
}

export function AttributeValuesForm(props: AttributeValuesFormProps) {
	switch ( props.type ) {
		case InputType.DROPDOWN:
		case InputType.MULTISELECT:
			return <DropdownValues values={ props.values }
								   onValueRemove={ props.onValueRemove }
								   onValueCreate={ props.onValueCreate }
								   onValueUpdate={ props.onValueUpdate }
			/>;
		case InputType.REFERENCE:
		case InputType.NUMERIC:
		case InputType.RICH_TEXT:
		case InputType.SWATCH:
		case InputType.DATE:
		case InputType.DATE_TIME:
			return <AdminSection title={ 'Attribute Values' }>
				<div className={ 'p-5' }>
					<h1>This is type is currently not supported</h1>
				</div>
			</AdminSection>;
		case InputType.FILE:
		case InputType.BOOLEAN:
		default:
			return null;
	}


}

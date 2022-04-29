import { AttributeValueDto, CreateAttributeValueDto, InputType } from '@nima/sdk';
import React from 'react';
import { AdminSection } from '../AdminLayout';
import { DropdownValues } from './DropdownValues';

interface AttributeValuesFormProps {
	type: InputType;
	values: (AttributeValueDto | CreateAttributeValueDto)[];
	onValueCreate?: (value: CreateAttributeValueDto) => void;
}

export function AttributeValuesForm(props: AttributeValuesFormProps) {
	switch ( props.type ) {
		case InputType.DROPDOWN:
		case InputType.MULTISELECT:
			return <DropdownValues values={ props.values } onValueCreate={ props.onValueCreate }/>;
		case InputType.FILE:
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
		case InputType.BOOLEAN:
		default:
			return null;
	}


}

import { Trans, useAttributeById, useProductTypeId } from '@nima/react';
import { CreateAssignedProductAttributeDto, InputType } from '@nima/sdk';
import React from 'react';
import { BooleanSelector, DropdownValueSelector } from './valueSelectors';

export interface EditProductAttributeProps {
	productTypeId: number;
	productAttributeValue: CreateAssignedProductAttributeDto;
	onSelect: (productAttributeValue: CreateAssignedProductAttributeDto) => void;
}

export interface EditSingleProductAttributeProps extends Omit<EditProductAttributeProps, 'productTypeId'> {
	attributeId: number;
}

export function EditProductAttribute(props: EditProductAttributeProps) {
	const { data: productType } = useProductTypeId(props.productTypeId);
	const attributeFromType = productType?.attributes.find(at => at.id === props.productAttributeValue.productTypeAttributeId);
	const attributeId: number | undefined = attributeFromType?.attributeId;
	const { data: attribute } = useAttributeById(attributeId);
	if ( !attribute || !attributeId ) return null;

	return (
		<div className={ 'flex justify-between items-center' }>
			<h1><Trans>{ attribute.name }</Trans>{ attribute.valueRequired ?
				<span className={ 'text-sm text-gray-400 pl-1' }>(required)</span> : '' }</h1>
			<AttributeTypeSwitch
				attributeId={ attributeId }
				type={ attribute.inputType }
				onSelect={ props.onSelect }
				productAttributeValue={ props.productAttributeValue }
			/>
		</div>
	);
}

function AttributeTypeSwitch(props: EditSingleProductAttributeProps & { type: InputType }) {
	switch ( props.type ) {
		case InputType.DROPDOWN:
			return <DropdownValueSelector { ...props } />;
		case InputType.MULTISELECT:
			return <DropdownValueSelector { ...props } isMulti/>;
		case InputType.BOOLEAN:
			return <BooleanSelector { ...props } />;
		default:
			return <h1>Currently not supported</h1>;
	}
}

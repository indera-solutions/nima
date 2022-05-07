import { useAttributeValues, useLanguages } from '@nima/react';
import React, { useEffect } from 'react';
import { EditSingleProductAttributeProps } from '../EditProductAttribute';


export function BooleanSelector(props: EditSingleProductAttributeProps) {
	const { attributeId } = props;
	const languages = useLanguages();
	const { data: values } = useAttributeValues(attributeId);

	useEffect(() => {
		if ( !values || !props.onSelect ) return;
		if ( props.productAttributeValue.values.length === 0 ) {
			const falseValue = values.find(v => v.boolean === false);
			if ( !falseValue ) return;
			props.onSelect({
				...props.productAttributeValue,
				values: [{
					valueId: falseValue.id,
					sortOrder: 0,
				}],
			});
		}
	}, [props.productAttributeValue.values, values]);
	//
	// if ( !values ) return null;
	//
	// const selectedValue = values.find(v => v.id === valueId);
	//
	//
	// function onChange(e: any) {
	// 	if ( !values || !props.onSelect ) return;
	// 	const checked = e.target.checked;
	// 	const value = values.find(v => v.boolean === checked);
	// 	if ( !value ) {
	// 		toasties.error('Option not found');
	// 		return;
	// 	}
	// 	props.onSelect({
	// 		...props.productAttributeValue,
	// 		valueId: value.id,
	// 	});
	// }
	//
	//
	// return (
	// 	<input type='checkbox' className='toggle' checked={ selectedValue?.boolean } onChange={ onChange } />
	// );

	return <h1>boolean</h1>;
}

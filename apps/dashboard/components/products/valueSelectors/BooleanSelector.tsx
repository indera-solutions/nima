import { useAttributeValues, useLanguages } from '@nima/react';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
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

	if ( !values ) return null;

	const selectedValue = values.find(v => v.id === props.productAttributeValue.values[0]?.valueId);


	function onChange(e: any) {
		if ( !values || !props.onSelect ) return;
		const checked = e.target.checked;
		const value = values.find(v => v.boolean === checked);
		if ( !value ) {
			toast.error('Option not found');
			return;
		}
		props.onSelect({
			...props.productAttributeValue,
			values: [{
				valueId: value.id,
				sortOrder: 0,
			}],
		});
	}


	return (
		<input type="checkbox" className="checkbox" checked={ selectedValue?.boolean } onChange={ onChange }/>
	);

	return <h1>boolean</h1>;
}

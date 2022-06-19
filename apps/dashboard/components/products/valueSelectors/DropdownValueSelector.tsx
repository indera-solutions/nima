import { getTranslation, useAddAttributeValueMutation, useAttributeValues, useLanguages } from '@nima-cms/react';
import React, { useMemo } from 'react';
import { ActionMeta, OnChangeValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { EditSingleProductAttributeProps } from '../EditProductAttribute';


export function DropdownValueSelector(props: EditSingleProductAttributeProps & { isMulti?: boolean }) {
	const { attributeId } = props;
	const languages = useLanguages();
	const { data: values } = useAttributeValues(attributeId);

	const addAttributeValueMutation = useAddAttributeValueMutation();

	const options = useMemo(() => {
		if ( !values ) return [];
		return values
			.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
			.map(value => ({
				label: getTranslation(value.name, languages.currentEditingLanguage),
				value: value.id,
			}));
	}, [values, languages]);

	const selected = useMemo(() => {
		if ( !props.productAttributeValue.values ) return undefined;
		if ( !values ) return;
		if ( props.isMulti ) {
			return props.productAttributeValue.values.map(value => {
				const temp = value ? values.find(v => v.id === value.valueId) : undefined;
				if ( !temp ) return undefined;
				return {
					label: getTranslation(temp.name, languages.currentEditingLanguage),
					value: value.valueId,
				};
			}).filter(v => !!v);
		} else {
			const temp = props.productAttributeValue.values[0] ? values.find(v => v.id === props.productAttributeValue.values[0].valueId) : undefined;
			if ( !temp ) return undefined;
			return {
				label: getTranslation(temp.name, languages.currentEditingLanguage),
				value: props.productAttributeValue.values[0].valueId,
			};
		}
	}, [props.productAttributeValue.values, languages, props.isMulti, values]);

	async function handleChange(newValue: OnChangeValue<any, false>, actionMeta: ActionMeta<any>) {
		if ( !props.onSelect ) return;
		if ( actionMeta.action === 'select-option' || actionMeta.action === 'remove-value' ) {
			if ( props.isMulti ) {
				props.onSelect({
					...props.productAttributeValue,
					values: newValue.map((v: any, index) => ({
						valueId: v.value,
						sortOrder: index,
					})),
				});
			} else {
				props.onSelect({
					...props.productAttributeValue,
					values: [{
						valueId: newValue.value,
						sortOrder: 0,
					}],
				});
			}
		}

		if ( actionMeta.action === 'create-option' ) {
			const valueToCreate = props.isMulti ? newValue.find((v: any) => v.__isNew__) : newValue;
			const newAttributeValue = await addAttributeValueMutation.mutateAsync({
				attributeId: attributeId,
				createAttributeValue: {
					name: { [languages.defaultLanguage]: valueToCreate.label },
					sortOrder: options.length,
				},
			});

			if ( props.isMulti ) {
				const existing = newValue.filter((v: any) => !v.__isNew__).map((v: any) => v.value);
				existing.push(newAttributeValue.id);
				props.onSelect({
					...props.productAttributeValue,
					values: existing.map((v: any, index) => ({
						valueId: v,
						sortOrder: index,
					})),
				});
			} else {
				props.onSelect({
					...props.productAttributeValue,
					values: [{
						valueId: newAttributeValue.id,
						sortOrder: 0,
					}],
				});
			}
		}
		if ( actionMeta.action === 'clear' ) {
			props.onSelect({
				...props.productAttributeValue,
				values: [],
			});
		}
	}

	return (
		<div className={ 'w-96' }>
			<CreatableSelect
				isLoading={ addAttributeValueMutation.isLoading }
				isMulti={ props.isMulti }
				isClearable
				value={ selected }
				onChange={ handleChange }
				options={ options }
			/>
		</div>
	);
}

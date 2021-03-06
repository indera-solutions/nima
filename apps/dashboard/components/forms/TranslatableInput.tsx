import { useLanguages } from '@nima-cms/react';
import { Translatable } from '@nima-cms/utils';
import React from 'react';

export interface TranslatableInputProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value' | 'type' | 'onChange' | 'placeholder'> {
	value: Translatable;
	onChange: (t: Translatable) => void;
}

export function TranslatableInput(props: TranslatableInputProps) {
	const { value, ...rest } = props;
	const languages = useLanguages();


	function onChange(e: any) {
		props.onChange({
			...value,
			[languages.currentEditingLanguage]: e.target.value,
		});
	}

	return <label className="input-group">
		<input
			className={ 'input input-bordered w-full ' + (props.className || '') }
			type={ 'text' }
			value={ value[languages.currentEditingLanguage] || '' }
			placeholder={ value[languages.defaultLanguage] }
			onChange={ onChange }/>
		<span>{ languages.currentEditingLanguage.toUpperCase() }</span>
	</label>;
}

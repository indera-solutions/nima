import { getTranslation, useCollections, useLanguages } from '@nima-cms/react';
import React, { useMemo } from 'react';
import Select from 'react-select';

interface CollectionSelectProps {
	selectedIds: number[];
	onChange: (id: number[]) => void;
	isClearable?: boolean;
}

export function CollectionSelect(props: CollectionSelectProps) {
	const { data: collections } = useCollections();

	const languages = useLanguages();

	const collectionOptions = useMemo<{ label: string, value: number }[]>(() => {
		if ( !collections ) return [];
		return collections.map(c => ({
			label: getTranslation(c.name, languages.adminLanguage),
			value: c.id,
		}));
	}, [collections, languages.adminLanguage]);

	const selectedCollectionOption = useMemo<{ label: string, value: number }[]>(() => {
		return collectionOptions.filter(co => props.selectedIds.includes(co.value));
	}, [collectionOptions, props.selectedIds]);
	return (

		<Select options={ collectionOptions }
				value={ selectedCollectionOption }
				isMulti
				onChange={ (newValue) => {
					props.onChange(newValue.map(c => c.value));
				} }
				styles={ { menu: styles => ({ ...styles, zIndex: 100 }) } }
				isClearable={ props.isClearable }
		/>


	);
}

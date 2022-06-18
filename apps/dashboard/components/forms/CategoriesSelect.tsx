import { getTranslation, useCategories, useLanguages } from '@nima-cms/react';
import { CategoryDto } from '@nima-cms/sdk';
import React, { useMemo } from 'react';
import Select from 'react-select';

interface CategoriesSelectProps {
	selectedId: number | undefined;
	onChange: (id: number) => void;
	isClearable?: boolean;
}

export function CategoriesSelect(props: CategoriesSelectProps) {
	const { data: categories } = useCategories();
	const languages = useLanguages();

	const categoriesOptions = useMemo<{ label: string, value: number }[]>(() => {
		if ( !categories ) return [];
		const temp: { label: string, value: number }[] = [];

		function getChildren(category: CategoryDto, depth = 0): { label: string, value: number }[] {
			const t = category.children
							  .sort((a, b) => getTranslation(a.name, languages.adminLanguage).localeCompare(getTranslation(b.name, languages.adminLanguage)))
							  .map(c => ({
								  label: ('—'.repeat(depth)) + ' ' + getTranslation(c.name, languages.adminLanguage),
								  value: c.id,
							  }));
			return [...t, ...(category.children.map(c => getChildren(c, depth + 1))).flat()];
		}

		categories
			.sort((a, b) => getTranslation(a.name, languages.adminLanguage).localeCompare(getTranslation(b.name, languages.adminLanguage)))
			.forEach(c => {
				temp.push({
					label: getTranslation(c.name, languages.adminLanguage),
					value: c.id,
				});
				temp.push(...getChildren(c, 1));
			});
		return temp;
	}, [categories, languages.adminLanguage]);

	const selectedCategoryOption = useMemo<{ label: string, value: number } | undefined>(() => {
		if ( !props.selectedId ) return undefined;
		return categoriesOptions.find(co => co.value === props.selectedId);
	}, [categoriesOptions, props.selectedId]);
	return (

		<Select options={ categoriesOptions }
				value={ selectedCategoryOption }
				onChange={ (newValue) => {
					props.onChange(newValue?.value);
				} }
				styles={ { menu: styles => ({ ...styles, zIndex: 100 }) } }
				isClearable={ props.isClearable }
		/>


	);
}

import { capitalize, LanguageCode, Translatable } from '@nima-cms/utils';
import React from 'react';
import { useLanguages } from './providers';

interface TransProps {
	useEditingLanguage?: boolean;
	caps?: boolean;
	children?: Translatable | string;
}

export function Trans(props: TransProps): React.ReactElement {
	const languages = useLanguages();
	const translation = getTranslation(props.children, languages.adminLanguage, props.useEditingLanguage, languages.currentEditingLanguage);
	const final = props.caps ? capitalize(translation) : translation;

	return <React.Fragment>{ final }</React.Fragment>;
}

export function getTranslation(text?: Translatable | string, adminLanguage?: LanguageCode, useEditingLanguage?: boolean, currentEditingLanguage?: LanguageCode): string {
	if ( !text ) return '';
	if ( typeof text === 'string' ) return text;
	if ( useEditingLanguage && currentEditingLanguage ) {
		return text[currentEditingLanguage] || '';
	}

	if ( !adminLanguage ) return text['en'] || text['el'] || '';


	return text[adminLanguage] || text['en'] || text['el'] || '';

}

import { getTranslation, useSettings } from '@nima-cms/react';
import { LanguageCode, Translatable } from '@nima-cms/utils';
import React, { useContext, useState } from 'react';

require('dayjs/locale/el');

export interface LanguageContextStructure {
	availableLanguages: LanguageCode[];
	defaultLanguage: LanguageCode;
	adminLanguage: LanguageCode;
	currentEditingLanguage: LanguageCode;
	setCurrentEditingLanguage: (e: LanguageCode) => void;
}

const LanguageContext = React.createContext<LanguageContextStructure>({
	currentEditingLanguage: LanguageCode.en,
	availableLanguages: [LanguageCode.en],
	defaultLanguage: LanguageCode.en,
	adminLanguage: LanguageCode.en,
	setCurrentEditingLanguage: (e: string) => {
		throw new Error('Default implementation');
	},
});

LanguageContext.displayName = 'LanguageContext';

interface LanguageContextProviderProps {
	children: React.ReactNode;
}


export function LanguageContextProvider(props: LanguageContextProviderProps): React.ReactElement {
	const [currentEditingLanguage, setCurrentEditingLanguage] = useState<LanguageCode>(LanguageCode.en);
	const { data: settings } = useSettings();

	return <LanguageContext.Provider
		value={ {
			currentEditingLanguage,
			setCurrentEditingLanguage,
			adminLanguage: settings?.adminLanguage || LanguageCode.en,
			defaultLanguage: settings?.defaultLanguage || LanguageCode.en,
			availableLanguages: settings?.availableLanguages || [LanguageCode.en],
		} }
	>
		{ props.children }
	</LanguageContext.Provider>;
}

export function useLanguages() {
	return useContext(LanguageContext);
}

export function useTranslations() {
	const languages = useLanguages();

	return {
		getEditingTranslation: (trans: Translatable) => getTranslation(trans, languages.currentEditingLanguage),
		getAdminTranslation: (trans: Translatable) => getTranslation(trans, languages.adminLanguage),
	};

}

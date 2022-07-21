import { useLanguages } from '@nima-cms/react';
import React from 'react';

interface SelectEditingLanguageProps {

}

export function SelectEditingLanguage(props: SelectEditingLanguageProps) {
	const { availableLanguages, currentEditingLanguage, setCurrentEditingLanguage, defaultLanguage } = useLanguages();
	return (
		<div className="tabs">
			{ [
				defaultLanguage,
				...availableLanguages.filter(l => l !== defaultLanguage),
			].sort((a, b) => {
				if ( a === defaultLanguage ) return 100;
				return 0;
			}).map(l => <span
				key={ l }
				className={ 'tab tab-lifted ' + (l === currentEditingLanguage ? 'tab-active' : '') }
				onClick={ () => setCurrentEditingLanguage(l) }
			>
				{ l.toUpperCase() }
			</span>) }
		</div>
	);
}

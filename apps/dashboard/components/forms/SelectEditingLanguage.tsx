import { useLanguages } from '@nima/react';
import React from 'react';

interface SelectEditingLanguageProps {

}

export function SelectEditingLanguage(props: SelectEditingLanguageProps) {
	const { availableLanguages, currentEditingLanguage, setCurrentEditingLanguage } = useLanguages();
	return (
		<div className="tabs">
			{ availableLanguages.map(l => <span
				key={ l }
				className={ 'tab tab-lifted ' + (l === currentEditingLanguage ? 'tab-active' : '') }
				onClick={ () => setCurrentEditingLanguage(l) }
			>
				{ l.toUpperCase() }
			</span>) }
			{/*<a className="tab tab-lifted">Tab 1</a>*/ }
			{/*<a className="tab tab-lifted tab-active">Tab 2</a>*/ }
			{/*<a className="tab tab-lifted">Tab 3</a>*/ }
		</div>
	);
}

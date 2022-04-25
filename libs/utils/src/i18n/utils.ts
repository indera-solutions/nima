import { countries, ICountry, IState, states } from '@loom/utils';

export function getCountriesArray(): ICountry[] {
	return Object.values(countries);
}

export function getStatesOfCountryByAlpha2(alpha2: string): IState[] {
	if ( states[alpha2] === undefined ) {
		// console.error('Invalid country code');
		return [];
	}
	return Object.values(states[alpha2]);
}

export function getCountryName(country: ICountry, locale?: string): string {
	if ( !locale || !country.locale || !country.locale[locale] ) return country.name;
	return country.locale[locale];
}

export function getStateName(state: IState, locale?: string): string {
	if ( !locale || !state.locale || !state.locale[locale] ) return state.name;
	return state.locale[locale];
}

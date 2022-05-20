import { continents, IContinent } from './continents';
import { countries, ICountry } from './countries';
import { IState, states } from './states';

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

export function getCountryByCode(countryCode: string): ICountry {
	return countries[countryCode];
}

export function getCountryName(country: ICountry, locale?: string): string {
	if ( !locale || !country.locale || !country.locale[locale] ) return country.name;
	return country.locale[locale];
}

export function getStateName(state: IState, locale?: string): string {
	if ( !locale || !state.locale || !state.locale[locale] ) return state.name;
	return state.locale[locale];
}

export function getStateAndCountry(countryCode: string, stateCode: string): IState {
	return states[countryCode][stateCode];
}

export function getStateByCode(stateCode: string): IState {
	for ( const country in states ) {
		if ( states[country][stateCode] ) {
			console.log(states[country][stateCode]);
			return states[country][stateCode];
		}
	}
	return undefined;
}

export function getContinentByCode(code: string): IContinent {
	return continents[code];
}

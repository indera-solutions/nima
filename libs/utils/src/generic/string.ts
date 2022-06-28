const { convert } = require('html-to-text');

export function toTitleCase(str: string) {
	// str = str.replace("_", " ");
	str = str.split('_').join(' '); // using split it removes all underscores, not only the first (as replace does)
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		},
	);
}

export function camelCaseToNormal(str: string) {
	return str
		// insert a space between lower & upper
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		// space before last upper in a sequence followed by lower
		.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
		// uppercase the first character
		.replace(/^./, function (str) {
			return str.toUpperCase();
		});
}

export function normalizeUppercaseAccents(text: string) {
	return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function capitalize(text: string) {
	return normalizeUppercaseAccents(text.toUpperCase());
}

export const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${ letter.toLowerCase() }`);

export function parseIdStr(str: string | string[]): number {
	if ( Array.isArray(str) ) {
		if ( str.length === 1 ) return +str[0];
		else throw new Error('invalid id');
	}

	return +str;
}

export function parseQueryString(str: string | string[]): string {
	if ( Array.isArray(str) ) {
		if ( str.length === 1 ) return str[0];
		else throw new Error('invalid id');
	}
	return str;
}

export function getSlug(input: string): string {
	return encodeURIComponent(input.replace(/ /g, '-')).toLowerCase();
}

export function getRandomString(length: number) {
	let r = Math.random().toString(36).substring(2);
	while ( r.length < length ) r += Math.random().toString(36).substring(2);
	return r.slice(r.length - length);
}

export function htmlToPlain(html: string): string {
	let str: string = convert(html, {
		wordwrap: false,
	});

	str = str.toLowerCase();
	str = str.replace(/(?:\r\n|\r|\n)/g, ' ');
	str = str.replace(/\*/g, '');
	return str;
}

export function searchPrepare(str: string): string {
	const trimmedSearch = str.trim();
	const searchArray = trimmedSearch.split(/\s+/);
	const searchWithStar = searchArray.join(' & ') + ':*';
	return searchWithStar;
}

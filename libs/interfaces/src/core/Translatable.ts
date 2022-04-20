export enum LanguageCode {
	en = 'en',
	el = 'el',
	fr = 'fr',
	es = 'es',
	it = 'it',
	de = 'de',
}

export type Translatable = {
	[K in LanguageCode]?: string;
};

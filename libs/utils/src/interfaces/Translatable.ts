export enum LanguageCode {
	en = 'en',
	el = 'el',
	fr = 'fr',
	es = 'es',
	it = 'it',
	de = 'de',
	ru = 'ru',
}

export type Translatable = {
	[K in LanguageCode]?: string;
};

export const languages: { code: LanguageCode, name: string }[] = [
	{ code: LanguageCode.en, name: 'English' },
	{ code: LanguageCode.el, name: 'Greek' },
	{ code: LanguageCode.fr, name: 'French' },
	{ code: LanguageCode.es, name: 'Spanish' },
	{ code: LanguageCode.it, name: 'Italian' },
	{ code: LanguageCode.de, name: 'German' },
	{ code: LanguageCode.ru, name: 'Russian' },
];

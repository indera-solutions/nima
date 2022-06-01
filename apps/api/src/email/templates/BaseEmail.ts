import { LanguageCode } from '@nima-cms/utils';

const mjml2html = require('mjml');


export interface BaseEmailParams {
	recipient: string;
}

export interface BaseAdminEmailParams {
}

export interface NimaEmail {
	body: string;
	html?: string;
	subject: string;
}

export abstract class BaseEmail {

	protected abstract getTemplate(language: LanguageCode, params: BaseEmailParams | BaseAdminEmailParams): NimaEmail;

	protected compileTemplateToHTML(template: string): string {
		const options = {
			validate: 'strict', // validation levels - 'strict'|'soft'|'none'
			cheerio: {}, // config passed to cheerio parser
			juice: {},
			elements: [
				// any custom elements you want to use
			],
		};

		const htmlOutput = mjml2html(template, options);

		if ( htmlOutput.errors && htmlOutput.errors.length > 0 ) {
			console.error(htmlOutput.errors);
			throw new Error('something went wrong');
		} else {
			return htmlOutput.html;
		}
	}
}

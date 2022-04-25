import { Address } from './Address';
import { Media } from './Media';
import { LanguageCode } from './Translatable';

export interface Settings {
	//Site Info
	siteName: string;
	siteLogo: Media;
	baseUrl: string;
	canRegister: boolean;
	seoTitle: string;
	seoDescription: string;

	//Languages
	adminLanguage: LanguageCode;
	availableLanguages: LanguageCode[];
	defaultLanguage: LanguageCode;

	//Shop Info
	shopAddress: Address;

	//Email
	senderEmail: string;
	senderName: string;
}

import { Address, LanguageCode, Metadata, User } from '@nima/interfaces';

export interface Checkout {
	created: string;
	lastChange: string;
	email?: string;
	token: string;
	user: User;
	billingAddress: Address;
	discountAmount: number;
	discountName?: string;
	note: string;
	shippingAddress: Address;
	shipping_method_id;
	voucherCode?: string;
	translatedDiscountName?: string;
	metadata: Metadata;
	privateMetadata: Metadata;
	currency: string;
	country: string;
	redirectUrl?: string;
	trackingCode?: string;
	languageCode: LanguageCode;
}

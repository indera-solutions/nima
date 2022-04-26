import { Address, LanguageCode, Metadata, User } from '@nima/interfaces';

export enum OrderStatus {
	DRAFT = 'DRAFT',
	UNCONFIRMED = 'UNCONFIRMED',
	UNFULFILLED = 'UNFULFILLED',
	PARTIALLY_FULFILLED = 'PARTIALLY_FULFILLED',
	PARTIALLY_RETURNED = 'PARTIALLY_RETURNED',
	RETURNED = 'RETURNED',
	FULFILLED = 'FULFILLED',
	CANCELED = 'CANCELED',
}

export interface Order {
	id: number;
	created: string;
	updatedAt: string;
	trackingClientId: string;
	userEmail: string;
	billingAddress?: Address;
	shippingAddress?: Address;
	user?: User;
	totalNetAmount: number;
	voucher_id?: number;
	languageCode: LanguageCode;
	shippingPriceGrossAmount: number;
	totalGrossAmount: number;
	shippingPriceNetAmount: number;
	status: OrderStatus;
	shippingMethodName?: string;
	shippingMethodId?: number;
	displayGrossPrices: boolean;
	customerNote: string;
	weight: number;
	checkoutToken: string;
	currency: string;
	metadata: Metadata;
	privateMetadata: Metadata;
	// channel_id
	redirectUrl?: string;
	shippingTaxRate: number;
	undiscountedTotalGrossAmount: number;
	undiscountedTotalNetAmount: number;
	totalPaidAmount: number;
	origin: string;
	original?: Order;
	searchDocument: string;
}

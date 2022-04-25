import { Metadata, ProductVariant } from '@nima/interfaces';

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

export enum OrderEventsEnum {
	DRAFT_CREATED = 'DRAFT_CREATED',
	DRAFT_CREATED_FROM_REPLACE = 'DRAFT_CREATED_FROM_REPLACE',
	ADDED_PRODUCTS = 'ADDED_PRODUCTS',
	REMOVED_PRODUCTS = 'REMOVED_PRODUCTS',
	PLACED = 'PLACED',
	PLACED_FROM_DRAFT = 'PLACED_FROM_DRAFT',
	OVERSOLD_ITEMS = 'OVERSOLD_ITEMS',
	CANCELED = 'CANCELED',
	ORDER_MARKED_AS_PAID = 'ORDER_MARKED_AS_PAID',
	ORDER_FULLY_PAID = 'ORDER_FULLY_PAID',
	ORDER_REPLACEMENT_CREATED = 'ORDER_REPLACEMENT_CREATED',
	ORDER_DISCOUNT_ADDED = 'ORDER_DISCOUNT_ADDED',
	ORDER_DISCOUNT_AUTOMATICALLY_UPDATED = 'ORDER_DISCOUNT_AUTOMATICALLY_UPDATED',
	ORDER_DISCOUNT_UPDATED = 'ORDER_DISCOUNT_UPDATED',
	ORDER_DISCOUNT_DELETED = 'ORDER_DISCOUNT_DELETED',
	ORDER_LINE_DISCOUNT_UPDATED = 'ORDER_LINE_DISCOUNT_UPDATED',
	ORDER_LINE_DISCOUNT_REMOVED = 'ORDER_LINE_DISCOUNT_REMOVED',
	ORDER_LINE_PRODUCT_DELETED = 'ORDER_LINE_PRODUCT_DELETED',
	ORDER_LINE_VARIANT_DELETED = 'ORDER_LINE_VARIANT_DELETED',
	UPDATED_ADDRESS = 'UPDATED_ADDRESS',
	EMAIL_SENT = 'EMAIL_SENT',
	CONFIRMED = 'CONFIRMED',
	PAYMENT_AUTHORIZED = 'PAYMENT_AUTHORIZED',
	PAYMENT_CAPTURED = 'PAYMENT_CAPTURED',
	EXTERNAL_SERVICE_NOTIFICATION = 'EXTERNAL_SERVICE_NOTIFICATION',
	PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
	PAYMENT_VOIDED = 'PAYMENT_VOIDED',
	PAYMENT_FAILED = 'PAYMENT_FAILED',
	INVOICE_REQUESTED = 'INVOICE_REQUESTED',
	INVOICE_GENERATED = 'INVOICE_GENERATED',
	INVOICE_UPDATED = 'INVOICE_UPDATED',
	INVOICE_SENT = 'INVOICE_SENT',
	FULFILLMENT_CANCELED = 'FULFILLMENT_CANCELED',
	FULFILLMENT_RESTOCKED_ITEMS = 'FULFILLMENT_RESTOCKED_ITEMS',
	FULFILLMENT_FULFILLED_ITEMS = 'FULFILLMENT_FULFILLED_ITEMS',
	FULFILLMENT_REFUNDED = 'FULFILLMENT_REFUNDED',
	FULFILLMENT_RETURNED = 'FULFILLMENT_RETURNED',
	FULFILLMENT_REPLACED = 'FULFILLMENT_REPLACED',
	FULFILLMENT_AWAITS_APPROVAL = 'FULFILLMENT_AWAITS_APPROVAL',
	TRACKING_UPDATED = 'TRACKING_UPDATED',
	NOTE_ADDED = 'NOTE_ADDED',
	OTHER = 'OTHER',
}

export interface Order {
	id: number;
	created: string;
	updatedAt: string;
	trackingClientId: string;
	userEmail: string;
	billing_address_id?;
	shipping_address_id?: number;
	user_id?: number;
	totalNetAmount: number;
	voucher_id?: number;
	languageCode: string;
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

export interface OrderLine {
	id: number;
	productName: string;
	productSku?: string;
	quantity: number;
	unitPriceNetAmount: number;
	unitPriceGrossAmount: number;
	isShippingRequired: boolean;
	order: Order;
	quantityFulfilled: number;
	variant: ProductVariant;
	taxRate: number;
	currency: string;
	variantName: string;
	totalPriceGrossAmount: number;
	totalPriceNetAmount: number;
	unitDiscountAmount: number;
	unitDiscountValue: number;
	unitDiscountReason?: string;
	unitDiscountType: string;
	undiscountedTotalPriceGrossAmount: number;
	undiscountedTotalPriceNetAmount: number;
	undiscountedUnitPriceGrossAmount: number;
	undiscountedUnitPriceNetAmount: number;
	saleId?: string;
	voucherCode?: string;
}

export interface OrderEvent {
	id: number;
	date: string;
	eventType: string;
	order: Order;
	user_id;
	parameters: Metadata;
}

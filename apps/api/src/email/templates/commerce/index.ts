import { AdminCommerceEmails } from './admin';

export * from './admin';
export * from './BaseCommerceEmail';
export * from './OrderRefunded.email';
export * from './OrderShipped.email';
export * from './OrderCanceled.email';
export * from './OrderCompleted.email';
export * from './OrderDetails.email';
export * from './OrderOnHold.email';
export * from './OrderPaymentPending.email';
export * from './OrderProcessing.email';

export enum CustomerCommerceEmails {
	BASE_COMMERCE = 'BASE_COMMERCE',
	ORDER_REFUNDED = 'ORDER_REFUNDED',
	ORDER_SHIPPED = 'ORDER_SHIPPED',
	ORDER_CANCELED = 'ORDER_CANCELED',
	ORDER_COMPLETED = 'ORDER_COMPLETED',
	ORDER_DETAILS = 'ORDER_DETAILS',
	ORDER_ON_HOLD = 'ORDER_ON_HOLD',
	ORDER_PAYMENT_PENDING = 'ORDER_PAYMENT_PENDING',
	ORDER_PROCESSING = 'ORDER_PROCESSING',
}

export const CommerceEmails = { ...CustomerCommerceEmails, ...AdminCommerceEmails };

export type CommerceEmails = CustomerCommerceEmails | AdminCommerceEmails

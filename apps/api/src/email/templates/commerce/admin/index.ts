export * from './OrderCanceled.admin.email';
export * from './LowStock.admin.email';
export * from './OrderCreated.admin.email';
export * from './OrderFailed.admin.email';
export * from './OrderPaymentPending.admin.email';

export enum AdminCommerceEmails {
	ORDER_CANCELED_ADMIN = 'ORDER_CANCELED_ADMIN',
	LOW_STOCK_ADMIN = 'LOW_STOCK_ADMIN',
	ORDER_CREATED_ADMIN = 'ORDER_CREATED_ADMIN',
	ORDER_FAILED = 'ORDER_FAILED',
	ORDER_PAYMENT_PENDING_ADMIN = 'ORDER_PAYMENT_PENDING_ADMIN',
}

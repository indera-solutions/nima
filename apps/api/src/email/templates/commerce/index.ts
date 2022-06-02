import { AdminCommerceEmails } from './admin';
import { CustomerCommerceEmails } from './customer';

export * from './admin';
export * from './customer';
export * from './BaseCommerceEmail';

export const CommerceEmails = { ...CustomerCommerceEmails, ...AdminCommerceEmails };

export type CommerceEmails = CustomerCommerceEmails | AdminCommerceEmails

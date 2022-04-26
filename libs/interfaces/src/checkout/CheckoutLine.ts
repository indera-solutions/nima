import { ProductVariant } from '@nima/interfaces';
import { Checkout } from './checkout';

export interface CheckoutLine {
	id: number;
	quantity: number;
	checkout: Checkout;
	variant: ProductVariant;
}

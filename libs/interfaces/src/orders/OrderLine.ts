import { Order, ProductVariant, Translatable } from '@nima/interfaces';

export interface OrderLine {
	id: number;
	productName: Translatable;
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
	variantName: Translatable;
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

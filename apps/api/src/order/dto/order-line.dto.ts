import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { OrderLineEntity } from '../entities/order-line.entity';
import { OrderEntity } from '../entities/order.entity';

export class OrderLineDto extends OmitType(OrderLineEntity, ['variant', 'order']) {

	static prepare(entity: OrderLineEntity): OrderLineDto {
		return {
			id: entity.id,
			currency: entity.currency,
			isShippingRequired: entity.isShippingRequired,
			productName: entity.productName,
			productSku: entity.productSku,
			quantity: entity.quantity,
			quantityFulfilled: entity.quantityFulfilled,
			saleId: entity.saleId,
			taxRate: entity.taxRate,
			totalPriceGrossAmount: entity.totalPriceGrossAmount,
			totalPriceNetAmount: entity.totalPriceNetAmount,
			undiscountedTotalPriceGrossAmount: entity.undiscountedTotalPriceGrossAmount,
			undiscountedTotalPriceNetAmount: entity.undiscountedTotalPriceNetAmount,
			undiscountedUnitPriceGrossAmount: entity.undiscountedUnitPriceGrossAmount,
			undiscountedUnitPriceNetAmount: entity.undiscountedUnitPriceNetAmount,
			unitDiscountAmount: entity.unitDiscountAmount,
			unitDiscountReason: entity.unitDiscountReason,
			unitDiscountType: entity.unitDiscountType,
			unitDiscountValue: entity.unitDiscountValue,
			unitPriceGrossAmount: entity.unitPriceGrossAmount,
			unitPriceNetAmount: entity.unitPriceNetAmount,
			variantName: entity.variantName,
			voucherCode: entity.voucherCode,
			variantId: entity.variantId,
		};
	}
}

export class CreateOrderLineDto extends OmitType(OrderLineDto, ['id', 'variantId']) {
	@ApiProperty({ type: Number })
	variantId: number;

	@ApiProperty({ type: Number })
	orderId: number;
}

export class InternalCreateOrderLineDto extends OmitType(OrderLineDto, ['id', 'variantId']) {

	variant: ProductVariantEntity;

	order: OrderEntity;
}

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {
}

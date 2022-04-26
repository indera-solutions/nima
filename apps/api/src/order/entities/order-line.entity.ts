import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderLine, ProductVariant, Translatable } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductVariantDto } from '../../products/dto/product-variant.dto';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderEntity } from './order.entity';

@Entity('orders_order_lines')
export class OrderLineEntity implements OrderLine {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Name' } })
	productName: Translatable;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'product-name', required: false })
	productSku?: string;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	quantity: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	unitPriceNetAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	unitPriceGrossAmount: number;

	@Column({ type: Boolean })
	@ApiProperty({ type: Boolean, example: true })
	isShippingRequired: boolean;

	@ManyToOne(() => OrderEntity)
	@ApiProperty({ type: OrderDto })
	order: Order;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	quantityFulfilled: number;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariant;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	taxRate: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	currency: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Name' } })
	variantName: Translatable;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalPriceGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalPriceNetAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	unitDiscountAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	unitDiscountValue: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'discount-reason', required: false })
	unitDiscountReason?: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	unitDiscountType: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedTotalPriceGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedTotalPriceNetAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedUnitPriceGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedUnitPriceNetAmount: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'summer-sale-2022', required: false })
	saleId?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	voucherCode?: string;
}

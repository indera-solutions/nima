import { ApiProperty } from '@nestjs/swagger';
import { Translatable } from '@nima-cms/utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { DiscountSaleEntity } from '../../discounts/entities/discount-sale.entity';
import { ProductVariantDto } from '../../products/dto/product-variant.dto';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { OrderEntity } from './order.entity';

@Entity('orders_order_lines')
export class OrderLineEntity {
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

	@ManyToOne(() => OrderEntity, order => order.lines)
	order: OrderEntity;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	quantityFulfilled: number;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariantEntity;

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

	@ManyToOne(() => DiscountSaleEntity, { nullable: true })
	sale?: DiscountSaleEntity;

	@RelationId((line: OrderLineEntity) => line.sale)
	@ApiProperty({ type: Number, example: 0, required: false })
	saleId?: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	voucherCode?: string;
}

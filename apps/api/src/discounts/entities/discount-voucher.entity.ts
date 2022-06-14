import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsBoolean, IsEnum, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import {
	Check,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollectionEntity } from '../../collections/entities/collection.entity';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { DiscountType, DiscountVoucherType } from '../dto/discount.enum';

@Entity('discounts_discount_voucher')
@Check(`"used" >= 0`)
@Check(`"usageLimit" >= 0`)
export class DiscountVoucherEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'enum', enum: DiscountVoucherType })
	@ApiProperty({ enum: DiscountVoucherType, enumName: 'DiscountVoucherType' })
	@IsEnum(DiscountVoucherType)
	voucherType: DiscountVoucherType;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Discount Voucher Name' } })
	@IsObject()
	name: Translatable;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'X90BJ0DIJV' })
	@IsString()
	code: string;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	@IsNumber()
	usageLimit: number;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	@IsNumber()
	used: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	@IsISO8601()
	startDate: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '2022-12-31', required: false })
	@IsISO8601()
	@IsOptional()
	endDate?: string;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	@IsNumber()
	discountValue: number;

	@Column({ type: 'enum', enum: DiscountType })
	@ApiProperty({ enum: DiscountType, enumName: 'DiscountType' })
	@IsEnum(DiscountType)
	discountValueType: DiscountType;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	applyOncePerOrder: boolean;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	@IsNumber()
	minCheckoutItemsQuantity: number;

	@Column({ type: Number })
	@ApiProperty({ type: Number })
	@IsNumber()
	minSpentAmount: number;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	applyOncePerCustomer: boolean;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	onlyForStaff: boolean;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	@IsOptional()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	@IsOptional()
	privateMetadata: Metadata;

	@CreateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@UpdateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	updatedAt: string;

	@ManyToMany(() => CategoryEntity)
	@JoinTable({ name: 'discounts_discount_voucher_categories' })
	categories: CategoryEntity[];

	@ManyToMany(() => ProductEntity)
	@JoinTable({ name: 'discounts_discount_voucher_products' })
	products: ProductEntity[];

	@ManyToMany(() => ProductVariantEntity)
	@JoinTable({ name: 'discounts_discount_voucher_variants' })
	variants: ProductVariantEntity[];

	@ManyToMany(() => CollectionEntity)
	@JoinTable({ name: 'discounts_discount_voucher_collections' })
	collections: CollectionEntity[];
}

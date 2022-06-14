import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsEnum, IsISO8601, IsNumber, IsObject, IsOptional } from 'class-validator';
import {
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
import { DiscountType } from '../dto/discount.enum';

@Entity('discounts_discount_sale')
export class DiscountSaleEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Discount Sale Name' } })
	@IsObject()
	name: Translatable;

	@Column({ type: 'enum', enum: DiscountType })
	@ApiProperty({ enum: DiscountType, enumName: 'DiscountType' })
	@IsEnum(DiscountType)
	discountType: DiscountType;

	@Column({ type: 'float', default: 0 })
	@ApiProperty({ type: Number })
	@IsNumber()
	discountValue: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '2022-12-31', required: false })
	@IsISO8601()
	@IsOptional()
	endDate?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '2022-01-01', required: false })
	@IsISO8601()
	@IsOptional()
	startDate?: string;

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

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	updatedAt: string;

	@ManyToMany(() => CategoryEntity)
	@JoinTable({ name: 'discounts_discount_sale_categories' })
	categories: CategoryEntity[];

	@ManyToMany(() => ProductEntity)
	@JoinTable({ name: 'discounts_discount_sale_products' })
	products: ProductEntity[];

	@ManyToMany(() => ProductVariantEntity)
	@JoinTable({ name: 'discounts_discount_sale_variants' })
	variants: ProductVariantEntity[];

	@ManyToMany(() => CollectionEntity)
	@JoinTable({ name: 'discounts_discount_sale_collections' })
	collections: CollectionEntity[];
}

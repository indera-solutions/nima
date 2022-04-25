import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Product, ProductVariant, Translatable } from '@nima/interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductVariantEntity implements ProductVariant {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'product-sku-1' })
	sku: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Category Seo Name' } })
	name: Translatable;

	@ManyToOne(() => ProductEntity)
	@ApiProperty({ type: ProductDto })
	product: Product;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	weight?: number;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	sortOrder?: number;

	@Column({ nullable: true })
	@ApiProperty({ type: Boolean, example: false, required: false })
	isPreorder?: boolean;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: '2022-01-01', required: false })
	preorderEndDate?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	preorderGlobalThreshold?: number;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	quantityLimitPerCustomer?: number;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01T00:00:00.000+0200' })
	created: string;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01T00:00:00.000+0200' })
	updatedAt: string;

	//Pricing
	@Column()
	@ApiProperty({ type: String, example: 'EUR' })
	currency: string;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1.4, required: false })
	priceAmount?: number;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1.2, required: false })
	costPriceAmount?: number;

	//Stock
	@Column()
	@ApiProperty({ type: Number, example: 10 })
	stock: number;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	trackInventory: boolean;
}

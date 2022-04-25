import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima/interfaces';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Product } from '@nima/interfaces';
import { CategoryDto } from '../../categories/dto/category.dto';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductTypeDto } from '../../product-types/dto/product-type.dto';
import { ProductTypeEntity } from '../../product-types/entities';
import { ProductVariantEntity } from './product-variant.entity';

@Entity()
export class ProductEntity implements Product {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Name' } })
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Description' } })
	description: Translatable;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '' })
	updatedAt: string;

	@ManyToOne(() => ProductTypeEntity /*,object => object.products*/)
	@ApiProperty({ type: ProductTypeDto })
	productType: ProductTypeEntity;

	@ManyToOne(() => CategoryEntity /*,object => object.products*/)
	@ApiProperty({ type: CategoryDto })
	category: CategoryEntity;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Description' })
	seoDescription: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Title' })
	seoTitle: string;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	chargeTaxes: boolean;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	weight: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'product-name' })
	slug: string;

	@OneToOne(() => ProductVariantEntity)
	@ApiProperty({ type: Number, example: 1 })
	defaultVariant: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'Product Description' })
	descriptionPlaintext: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 10 })
	rating: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'Product Name' })
	searchDocument: string;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	//Pricing
	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	isPublished: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	isVisibleInListings: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	isAvailableForPurchase: boolean;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	currency: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	minPrice: number;
}

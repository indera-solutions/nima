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
import { CategoryEntity } from '../../categories/entities/category.entity';
import { ProductTypeEntity } from '../../product-types/entities';
import { ProductVariantEntity } from './productVariant.entity';

@Entity()
export class ProductEntity implements Product{
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	description: Translatable;

	@UpdateDateColumn({ type: String })
	updatedAt: string;

	@ManyToOne(() => ProductTypeEntity, /*object => object.products*/)
	productType: ProductTypeEntity;

	@ManyToOne(() => CategoryEntity, /*object => object.products*/)
	category: CategoryEntity;

	@Column({ type: String })
	seoDescription: string;

	@Column({ type: String })
	seoTitle: string;

	@Column({ default: true })
	chargeTaxes: boolean;

	@Column({ type: 'float' })
	weight: number;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ type: String })
	slug: string;

	@OneToOne(() => ProductVariantEntity)
	defaultVariant: number;

	@Column({ type: String })
	descriptionPlaintext: string;

	@Column({ type: 'float' })
	rating: number;

	@Column({ type: String })
	searchDocument: string;

	@CreateDateColumn({ type: String })
	created: string;

	//Pricing
	@Column({ default: true })
	isPublished: boolean;

	@Column({ default: true })
	isVisibleInListings: boolean;

	@Column({ default: true })
	isAvailableForPurchase: boolean;

	@Column({ type: String })
	currency: string;

	@Column({ type: 'float' })
	minPrice: number;
}

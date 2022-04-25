import { Metadata, Product, ProductVariant, Translatable } from '@nima/interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ProductVariantEntity implements ProductVariant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sku: string;

	@Column({ type: 'jsonb', default: {} })
	name: Translatable;

	@ManyToOne(() => ProductEntity)
	product: Product;

	@Column({ nullable: true })
	weight?: number;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ nullable: true })
	sortOrder?: number;

	@Column({ nullable: true })
	isPreorder?: boolean;

	@Column({ nullable: true })
	preorderEndDate?: string;

	@Column({ nullable: true })
	preorderGlobalThreshold?: number;

	@Column({ nullable: true })
	quantityLimitPerCustomer?: number;

	@CreateDateColumn({ type: String })
	created: string;

	@UpdateDateColumn({ type: String })
	updatedAt: string;

	//Pricing
	@Column()
	currency: string;

	@Column({ nullable: true })
	priceAmount?: number;

	@Column({ nullable: true })
	costPriceAmount?: number;

	//Stock
	@Column()
	stock: number;

	@Column()
	trackInventory: boolean;
}

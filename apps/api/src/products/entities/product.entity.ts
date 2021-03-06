import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsBoolean, IsInt, IsNotEmptyObject, IsNumber, IsObject, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { CollectionProductsEntity } from '../../collections/entities/collection-products.entity';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductTypeDto } from '../../product-types/dto/product-type.dto';
import { ProductTypeEntity } from '../../product-types/entities';
import { AssignedProductAttributeEntity } from './product-attribute-assignment.entity';
import { ProductMediaEntity } from './product-media.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity('products_products')
export class ProductEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Name' } })
	@IsNotEmptyObject()
	name: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Description' } })
	@IsObject()
	description: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	descriptionRaw: any;


	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Description' } })
	@IsObject()
	additionalDescription: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	additionalDescriptionRaw: any;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '' })
	updatedAt: string;

	@ManyToOne(() => ProductTypeEntity /*,object => object.products*/)
	@ApiProperty({ type: ProductTypeDto })
	productType: ProductTypeEntity;

	@ManyToOne(() => CategoryEntity /*,object => object.products*/)
	category: CategoryEntity;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Description' })
	@IsString()
	seoDescription: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Title' })
	@IsString()
	seoTitle: string;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	chargeTaxes: boolean;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	weight: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'product-name' })
	@IsString()
	slug: string;

	@OneToOne(() => ProductVariantEntity, { deferrable: 'INITIALLY DEFERRED', onDelete: 'CASCADE' })
	@JoinColumn()
	defaultVariant: ProductVariantEntity;

	@RelationId((product: ProductEntity) => product.defaultVariant)
	@ApiProperty()
	defaultVariantId: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'Product Description' })
	@IsString()
	descriptionPlaintext: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 10 })
	@IsInt()
	rating: number;

	@Column({ type: String, default: '' })
	searchDocument: string;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	//Pricing
	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	isPublished: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	isVisibleInListings: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	isAvailableForPurchase: boolean;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	@IsString()
	currency: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	minPrice: number;

	@OneToMany(() => ProductMediaEntity, pm => pm.product)
	productMedia: ProductMediaEntity[];


	@OneToMany(() => AssignedProductAttributeEntity, assignedAttr => assignedAttr.product, { onUpdate: 'NO ACTION' })
	attributes: AssignedProductAttributeEntity[];

	@OneToMany(() => CollectionProductsEntity, collection => collection.product)
	collections: CollectionProductsEntity[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { DiscountType } from '../../discounts/dto/discount.enum';
import { AssignedProductVariantAttributeEntity } from './product-attribute-assignment.entity';
import { ProductVariantMediaEntity } from './product-variant-media.entity';
import { ProductEntity } from './product.entity';

@Entity('products_product_variants')
export class ProductVariantEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'product-sku-1' })
	@IsString()
	sku: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Variant Name' } })
	@IsObject()
	name: Translatable;

	@ManyToOne(() => ProductEntity, { deferrable: 'INITIALLY DEFERRED', onDelete: 'CASCADE' })
	product: ProductEntity;

	@RelationId((variant: ProductVariantEntity) => variant.product)
	productId: number;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	@IsNumber()
	@IsOptional()
	weight?: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	@IsInt()
	@IsOptional()
	sortOrder?: number;


	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01T00:00:00.000+0200' })
	created: string;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01T00:00:00.000+0200' })
	updatedAt: string;

	//Pricing
	@Column()
	@ApiProperty({ type: String, example: 'EUR' })
	@IsString()
	currency: string;

	@Column({ type: 'float', nullable: true })
	@ApiProperty({ type: Number, example: 1.4, required: false })
	@IsNumber()
	@IsOptional()
	priceAmount?: number;

	@Column({ type: 'float', nullable: true })
	@ApiProperty({ type: Number, example: 1.4, required: false })
	@IsNumber()
	@IsOptional()
	discountedPrice?: number;

	@Column({ type: 'enum', enum: DiscountType, nullable: true })
	@ApiProperty({ enum: DiscountType, enumName: 'DiscountType', required: false })
	@IsEnum(DiscountType)
	@IsOptional()
	discountType?: DiscountType;

	@Column({ type: 'float', default: 0, nullable: true })
	@ApiProperty({ type: Number })
	@IsNumber()
	discountValue?: number;

	//Stock
	@Column()
	@ApiProperty({ type: Number, example: 10 })
	@IsInt()
	stock: number;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	trackInventory: boolean;

	@OneToMany(() => ProductVariantMediaEntity, pm => pm.productVariant, { eager: true })
	productMedia: ProductVariantMediaEntity[];

	@OneToMany(() => AssignedProductVariantAttributeEntity, assignedAttr => assignedAttr.variant, { eager: true, onUpdate: 'NO ACTION' })
	attributes: AssignedProductVariantAttributeEntity[];
}

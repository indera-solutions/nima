import { ApiProperty } from '@nestjs/swagger';
import { Category, DiscountSale, DiscountType, Metadata, Product, Translatable } from '@nima/interfaces';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { CategoryDto } from '../../categories/dto/category.dto';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ProductDto } from '../../products/dto/product.dto';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('discounts_discount_sale')
export class DiscountSaleEntity implements DiscountSale {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Discount Sale Name' } })
	name: Translatable;

	@Column({ type: 'enum', enum: DiscountType })
	@ApiProperty({ enum: DiscountType })
	discountType: DiscountType;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '2022-12-31', required: false })
	endDate?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '2022-01-01', required: false })
	startDate?: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	updatedAt: string;

	@ManyToMany(() => CategoryEntity)
	@JoinTable({ name: 'discounts_discount_sale_categories' })
	@ApiProperty({ type: [CategoryDto] })
	categories: Category[];

	@ManyToMany(() => ProductEntity)
	@JoinTable({ name: 'discounts_discount_sale_products' })
	@ApiProperty({ type: [ProductDto] })
	products: Product[];

}

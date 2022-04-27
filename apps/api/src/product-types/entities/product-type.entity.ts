import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '@nima/utils';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_type_product_types')
export class ProductTypeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1 })
	id: number;

	@Column()
	@ApiProperty({ example: 'Product Type' })
	name: string;

	@Column()
	@ApiProperty({ example: false })
	hasVariants: boolean;

	@Column()
	@ApiProperty({ example: false })
	isShippingRequired: boolean;

	@Column({ type: 'float' })
	@ApiProperty({ example: 22.1 })
	weight: number;

	@Column()
	@ApiProperty({ example: false })
	isDigital: boolean;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ example: {} })
	privateMetadata: Metadata;

	@Column()
	@ApiProperty({ example: 'product-type' })
	slug: string;
}

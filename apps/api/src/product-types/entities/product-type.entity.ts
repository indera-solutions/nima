import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '@nima/utils';
import { IsBoolean, IsInt, IsNumber, IsObject, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_type_product_types')
export class ProductTypeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1 })
	@IsInt()
	id: number;

	@Column()
	@ApiProperty({ example: 'Product Type' })
	@IsString()
	name: string;

	@Column()
	@ApiProperty({ example: false })
	@IsBoolean()
	hasVariants: boolean;

	@Column()
	@ApiProperty({ example: false })
	@IsBoolean()
	isShippingRequired: boolean;

	@Column({ type: 'float' })
	@ApiProperty({ example: 22.1 })
	@IsNumber({ allowNaN: false, maxDecimalPlaces: 2 })
	weight: number;

	@Column()
	@ApiProperty({ example: false })
	@IsBoolean()
	isDigital: boolean;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column()
	@ApiProperty({ example: 'product-type' })
	@IsString()
	slug: string;
}

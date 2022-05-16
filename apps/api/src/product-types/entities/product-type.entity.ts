import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '@nima-cms/utils';
import { IsBoolean, IsInt, IsNumber, IsObject, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductTypeAttributeEntity } from './product-type-attribute.entity';
import { ProductTypeVariantAttributeEntity } from './product-type-variant-attribute.entity';

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

	@OneToMany(() => ProductTypeAttributeEntity, pta => pta.productType)
	attributes?: ProductTypeAttributeEntity[];

	@OneToMany(() => ProductTypeVariantAttributeEntity, pta => pta.productType)
	variantAttributes?: ProductTypeVariantAttributeEntity[];
}

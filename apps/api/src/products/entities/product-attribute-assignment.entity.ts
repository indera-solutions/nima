import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
	ProductTypeAttributeDto,
	ProductTypeVariantAttributeDto,
} from '../../product-types/dto/product-type-attribute.dto';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../../product-types/entities';
import { ProductVariantDto } from '../dto/product-variant.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductEntity } from './product.entity';

@Entity('products_assigned_product_attributes')
export class AssignedProductAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductEntity)
	@ApiProperty({ type: ProductDto })
	product: ProductDto;

	@ManyToOne(() => ProductTypeAttributeEntity)
	@ApiProperty({ type: ProductTypeAttributeDto })
	productTypeAttribute: ProductTypeAttributeDto;
}

@Entity('products_assigned_product_variant_attributes')
export class AssignedProductVariantAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariantDto;

	@ManyToOne(() => ProductTypeVariantAttributeEntity)
	@ApiProperty({ type: ProductTypeVariantAttributeDto })
	productTypeVariantAttribute: ProductTypeVariantAttributeDto;
}

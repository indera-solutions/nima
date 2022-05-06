import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
	ProductTypeAttributeDto,
	ProductTypeVariantAttributeDto,
} from '../../product-types/dto/product-type-attribute.dto';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../../product-types/entities';
import { ProductVariantDto } from '../dto/product-variant.dto';
import { ProductDto } from '../dto/product.dto';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './product-attribute-value-assignment.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductEntity } from './product.entity';

@Entity('products_assigned_product_attributes')
export class AssignedProductAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductEntity, product => product.attributes)
	@ApiProperty({ type: ProductDto })
	product: ProductEntity;

	@ManyToOne(() => ProductTypeAttributeEntity, { eager: true })
	@ApiProperty({ type: ProductTypeAttributeDto })
	productTypeAttribute: ProductTypeAttributeEntity;

	@OneToMany(() => AssignedProductAttributeValueEntity, assignedValue => assignedValue.assignedProductAttribute, { eager: true })
	values: AssignedProductAttributeValueEntity[];
}

@Entity('products_assigned_product_variant_attributes')
export class AssignedProductVariantAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariantEntity;

	@ManyToOne(() => ProductTypeVariantAttributeEntity, { eager: true })
	@ApiProperty({ type: ProductTypeVariantAttributeDto })
	productTypeVariantAttribute: ProductTypeVariantAttributeEntity;

	@OneToMany(() => AssignedProductAttributeValueEntity, assignedValue => assignedValue.assignedProductAttribute, { eager: true })
	values: AssignedProductVariantAttributeValueEntity[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {
	ProductTypeAttributeDto,
	ProductTypeVariantAttributeDto,
} from '../../product-types/dto/product-type-attribute.dto';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../../product-types/entities';
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

	@ManyToOne(() => ProductEntity, product => product.attributes, { onDelete: 'CASCADE' })
		// @ApiProperty({ type: ProductDto })
	product: ProductEntity;

	@ManyToOne(() => ProductTypeAttributeEntity, { eager: true, onDelete: 'CASCADE' })
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

	@ManyToOne(() => ProductVariantEntity, { onDelete: 'CASCADE' })
	variant: ProductVariantEntity;

	@ManyToOne(() => ProductTypeVariantAttributeEntity, { eager: true, onDelete: 'CASCADE' })
	@ApiProperty({ type: ProductTypeVariantAttributeDto })
	productTypeVariantAttribute: ProductTypeVariantAttributeEntity;

	@OneToMany(() => AssignedProductVariantAttributeValueEntity, assignedValue => assignedValue.assignedProductVariantAttribute, { eager: true })
	values: AssignedProductVariantAttributeValueEntity[];
}

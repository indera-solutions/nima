import { ApiProperty } from '@nestjs/swagger';
import {
	AssignedProductAttribute,
	AssignedProductAttributeValue,
	AssignedProductVariantAttribute,
	AssignedProductVariantAttributeValue,
	AttributeValue,
	Product,
	ProductTypeAttribute,
	ProductTypeVariantAttribute,
	ProductVariant,
} from '@nima/interfaces';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueDto } from '../../attributes/dto/attribute-value.dto';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
import { ProductTypeAttributeDto } from '../../product-types/dto/product-type-attribute.dto';
import { ProductTypeAttributeEntity, ProductTypeVariantAttributeEntity } from '../../product-types/entities';
import {
	AssignedProductAttributeDto,
	AssignedProductVariantAttributeDto,
} from '../dto/product-attribute-assignment.dto';
import { ProductVariantDto } from '../dto/product-variant.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductEntity } from './product.entity';

export class AssignedProductAttributeEntity implements AssignedProductAttribute {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductEntity)
	@ApiProperty({ type: ProductDto })
	product: Product;

	@ManyToOne(() => ProductTypeAttributeEntity)
	@ApiProperty({ type: ProductTypeAttributeDto })
	productTypeAttribute: ProductTypeAttribute;
}

export class AssignedProductAttributeValueEntity implements AssignedProductAttributeValue {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductAttributeEntity)
	@ApiProperty({ type: AssignedProductAttributeDto })
	assignedProductAttribute: AssignedProductAttribute;

	@ManyToOne(() => AttributeValueEntity)
	@ApiProperty({type: AttributeValueDto})
	value: AttributeValue;
}

export class AssignedProductVariantAttributeEntity implements AssignedProductVariantAttribute {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariant;

	@ManyToOne(() => ProductTypeVariantAttributeEntity)
	@ApiProperty({ type: AssignedProductAttributeDto })
	productTypeVariantAttribute: ProductTypeVariantAttribute;
}

export class AssignedProductVariantAttributeValueEntity implements AssignedProductVariantAttributeValue {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductVariantAttributeEntity)
	@ApiProperty({ type: AssignedProductVariantAttributeDto})
	assignedProductVariantAttribute: AssignedProductVariantAttribute;

	@ManyToOne(() => AttributeValueEntity)
	@ApiProperty({type: AttributeValueDto})
	value: AttributeValue;
}

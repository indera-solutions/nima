import { ApiProperty } from '@nestjs/swagger';
import {
	AssignedProductAttribute,
	AssignedProductAttributeValue,
	AssignedProductVariantAttribute,
	AssignedProductVariantAttributeValue,
	AttributeValue,
} from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueDto } from '../../attributes/dto/attribute-value.dto';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
import {
	AssignedProductAttributeDto,
	AssignedProductVariantAttributeDto,
} from '../dto/product-attribute-assignment.dto';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './product-attribute-assignment.entity';


@Entity('products_assigned_product_attribute_values')
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
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValue;
}

@Entity('products_assigned_product_variant_attribute_values')
export class AssignedProductVariantAttributeValueEntity implements AssignedProductVariantAttributeValue {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductVariantAttributeEntity)
	@ApiProperty({ type: AssignedProductVariantAttributeDto })
	assignedProductVariantAttribute: AssignedProductVariantAttribute;

	@ManyToOne(() => AttributeValueEntity)
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValue;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueDto } from '../../attributes/dto/attribute-value.dto';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './product-attribute-assignment.entity';

@Entity('products_assigned_product_attribute_values')
export class AssignedProductAttributeValueEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductAttributeEntity)
		// @ApiProperty({ type: AssignedProductAttributeDto })
	assignedProductAttribute: AssignedProductAttributeEntity;

	@ManyToOne(() => AttributeValueEntity, { eager: true })
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValueEntity;
}

@Entity('products_assigned_product_variant_attribute_values')
export class AssignedProductVariantAttributeValueEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductVariantAttributeEntity)
		// @ApiProperty({ type: AssignedProductVariantAttributeDto })
	assignedProductVariantAttribute: AssignedProductVariantAttributeEntity;

	@ManyToOne(() => AttributeValueEntity, { eager: true })
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValueEntity;
}

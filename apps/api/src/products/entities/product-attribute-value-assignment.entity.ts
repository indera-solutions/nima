import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductAttributeEntity, { onDelete: 'CASCADE' })
		// @ApiProperty({ type: AssignedProductAttributeDto })
	assignedProductAttribute: AssignedProductAttributeEntity;

	@Index()
	@ManyToOne(() => AttributeValueEntity, { eager: true, onDelete: 'CASCADE' })
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValueEntity;
}

@Entity('products_assigned_product_variant_attribute_values')
export class AssignedProductVariantAttributeValueEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;

	@ManyToOne(() => AssignedProductVariantAttributeEntity, { onDelete: 'CASCADE' })
		// @ApiProperty({ type: AssignedProductVariantAttributeDto })
	assignedProductVariantAttribute: AssignedProductVariantAttributeEntity;

	@Index()
	@ManyToOne(() => AttributeValueEntity, { eager: true, onDelete: 'CASCADE' })
	@ApiProperty({ type: AttributeValueDto })
	value: AttributeValueEntity;
}

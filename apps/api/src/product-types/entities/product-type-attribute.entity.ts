import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeEntity } from './product-type.entity';

@Entity('product_type_product_type_attributes')
export class ProductTypeAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => AttributeEntity, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
	attribute: AttributeEntity;

	@ManyToOne(() => ProductTypeEntity, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
	productType: ProductTypeEntity;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;
}

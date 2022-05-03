import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeDto } from '../../attributes/dto/attribute.dto';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeDto } from '../dto/product-type.dto';
import { ProductTypeEntity } from './product-type.entity';

@Entity('product_type_product_type_variant_attributes')
export class ProductTypeVariantAttributeEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AttributeEntity, { eager: true, onDelete: 'CASCADE', orphanedRowAction: 'delete' })
	attribute: AttributeDto;

	@ManyToOne(() => ProductTypeEntity, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
	productType: ProductTypeDto;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	variantSelection: boolean;
}

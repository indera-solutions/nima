import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeDto } from '../../attributes/dto/attribute.dto';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeDto } from '../dto/product-type.dto';
import { ProductTypeEntity } from './product-type.entity';

@Entity('product_type_product_type_attributes')
export class ProductTypeAttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@ManyToOne(() => AttributeEntity)
	@ApiProperty({ type: AttributeDto })
	attribute: AttributeDto;

	@ManyToOne(() => ProductTypeEntity)
	@ApiProperty({ type: ProductTypeDto })
	productType: ProductTypeDto;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Attribute, ProductType, ProductTypeAttribute } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeDto } from '../../attributes/dto/attribute.dto';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeDto } from '../dto/product-type.dto';
import { ProductTypeEntity } from './product-type.entity';

@Entity()
export class ProductTypeAttributeEntity implements ProductTypeAttribute {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@ManyToOne(() => AttributeEntity)
	@ApiProperty({ type: AttributeDto })
	attribute: Attribute;

	@ManyToOne(() => ProductTypeEntity)
	@ApiProperty({ type: ProductTypeDto })
	productType: ProductType;

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	sortOrder: number;
}

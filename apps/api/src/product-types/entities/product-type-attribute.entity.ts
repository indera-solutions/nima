import { Attribute, ProductType, ProductTypeAttribute } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeEntity } from './product-type.entity';

@Entity()
export class ProductTypeAttributeEntity implements ProductTypeAttribute {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AttributeEntity)
	attribute: Attribute;

	@ManyToOne(() => ProductTypeEntity)
	productType: ProductType;

	@Column()
	sortOrder: number;
}

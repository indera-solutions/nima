import { Attribute, ProductType, ProductTypeVariantAttribute } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeEntity } from './product-type.entity';

@Entity()
export class ProductTypeVariantAttributeEntity implements ProductTypeVariantAttribute {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AttributeEntity)
	attribute: Attribute;

	@ManyToOne(() => ProductTypeEntity)
	productType: ProductType;

	@Column()
	sortOrder: number;

	@Column()
	variantSelection: boolean;
}

import { Attribute, InputType, Metadata, Translatable, Unit } from '@nima/interfaces';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueEntity } from './attributeValue.entity';

@Entity('attribute_attributes')
export class AttributeEntity extends BaseEntity implements Attribute {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	name: Translatable;

	@Column()
	slug: string;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ default: true })
	availableInGrid: boolean;

	@Column({ default: true })
	visibleInStorefront: boolean;

	@Column({ default: true })
	filterableInDashboard: boolean;

	@Column({ default: true })
	filterableInStorefront: boolean;

	@Column({ default: true })
	valueRequired: boolean;

	@Column({ default: 0 })
	storefrontSearchPosition: number;

	@Column({ type: 'enum', enum: InputType })
	inputType: InputType;

	@Column({ type: 'enum', enum: Unit })
	unit?: Unit;

	@OneToMany(() => AttributeValueEntity, (value) => value.attribute)
	values: AttributeValueEntity;
}

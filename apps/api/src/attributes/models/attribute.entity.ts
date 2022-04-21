import { Metadata, Translatable } from '@nima/interfaces';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeValueEntity } from './attributeValue.entity';

export enum InputType {
	DROPDOWN = 'DROPDOWN',
	MULTISELECT = 'MULTISELECT',
	FILE = 'FILE',
	REFERENCE = 'REFERENCE',
	NUMERIC = 'NUMERIC',
	RICH_TEXT = 'RICH_TEXT',
	SWATCH = 'SWATCH',
	BOOLEAN = 'BOOLEAN',
	DATE = 'DATE',
	DATE_TIME = 'DATE_TIME',
}

export enum Unit {
	CM = 'CM',
	M = 'M',
	KM = 'KM',
	FT = 'FT',
	YD = 'YD',
	INCH = 'INCH',
	SQ_CM = 'SQ_CM',
	SQ_M = 'SQ_M',
	SQ_KM = 'SQ_KM',
	SQ_FT = 'SQ_FT',
	SQ_YD = 'SQ_YD',
	SQ_INCH = 'SQ_INCH',
	CUBIC_MILLIMETER = 'CUBIC_MILLIMETER',
	CUBIC_CENTIMETER = 'CUBIC_CENTIMETER',
	CUBIC_DECIMETER = 'CUBIC_DECIMETER',
	CUBIC_METER = 'CUBIC_METER',
	LITER = 'LITER',
	CUBIC_FOOT = 'CUBIC_FOOT',
	CUBIC_INCH = 'CUBIC_INCH',
	CUBIC_YARD = 'CUBIC_YARD',
	QT = 'QT',
	PINT = 'PINT',
	FL_OZ = 'FL_OZ',
	ACRE_IN = 'ACRE_IN',
	ACRE_FT = 'ACRE_FT',
	G = 'G',
	LB = 'LB',
	OZ = 'OZ',
	KG = 'KG',
	TONNE = 'TONNE',
}

@Entity()
export class AttributeEntity extends BaseEntity {
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

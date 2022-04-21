import { Metadata, Translatable } from '../core';

export interface Attribute {
	id: number;
	slug: string;
	name: Translatable;
	metadata: Metadata;
	privateMetadata: Metadata;
	availableInGrid: boolean;
	visibleInStorefront: boolean;
	filterableInDashboard: boolean;
	filterableInStorefront: boolean;
	valueRequired: boolean;
	storefrontSearchPosition: number;
	inputType: InputType;
	unit?: Unit;
}

export interface ICreateAttributeDto extends Omit<Attribute, 'id'> {
}


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

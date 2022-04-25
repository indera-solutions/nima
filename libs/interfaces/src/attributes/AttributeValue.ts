import { Translatable } from '../core';
import { Attribute } from './Attribute';

export interface AttributeValue {
	id: number;
	name: Translatable;
	attribute: Attribute;
	slug?: string;
	sortOrder?: number;
	value?: string;
	// content_type: ContentType;
	fileUrl?: string;
	richText?: Translatable;
	boolean?: boolean;
	dateTime?: string;
}

export interface CreateAttributeValueDto extends Omit<AttributeValue, 'id' | 'attribute'> {
	attributeId: number;
}

export function isCreateAttributeValueDto(x: unknown): x is CreateAttributeValueDto {
	if ( !x ) return false;
	return !x['id'] && !x['attribute'] && x['attributeId'];
}

import { LoomText } from '@loom/core-shared';
import { Attribute } from './Attribute';

export interface AttributeValue {
	id: number;
	name: LoomText;
	attribute: Attribute;
	slug?: string;
	sortOrder?: number;
	value?: string;
	// content_type: ContentType;
	fileUrl?: string;
	richText?: LoomText;
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

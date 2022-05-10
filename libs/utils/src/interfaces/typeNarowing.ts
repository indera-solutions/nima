import { CreateAttributeValueDto } from '@nima-cms/sdk';

export function isCreateAttributeValueDto(x: unknown): x is CreateAttributeValueDto {
	if ( !x ) return false;
	return !x['id'] && x['name'];
}

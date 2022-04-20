import { InputType, LoomMetadata, Unit } from '@loom/commercev2/shared';
import { LoomText } from '@loom/core-shared';

export interface Attribute {
	id: number;
	slug: string;
	name: LoomText;
	metadata: LoomMetadata;
	privateMetadata: LoomMetadata;
	availableInGrid: boolean;
	visibleInStorefront: boolean;
	filterableInDashboard: boolean;
	filterableInStorefront: boolean;
	valueRequired: boolean;
	storefrontSearchPosition: number;
	inputType: InputType;
	unit?: Unit;
}

export interface CreateAttributeDto extends Omit<Attribute, 'id'> {
}


import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Attribute, ICreateAttributeDto, InputType, Metadata, Translatable, Unit } from '@nima/interfaces';
import { TranslatableDto } from '../../core/dto/translatable.dto';

export class AdminAttributeDto implements Attribute {
	@ApiProperty({ type: Number })
	id: number;

	@ApiProperty({ type: String })
	slug: string;

	@ApiProperty({ type: TranslatableDto, example: { en: 'Attribute Name' } })
	name: Translatable;

	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@ApiProperty({ type: Boolean, example: true })
	availableInGrid: boolean;

	@ApiProperty({ type: Boolean, example: true })
	visibleInStorefront: boolean;

	@ApiProperty({ type: Boolean, example: true })
	filterableInDashboard: boolean;

	@ApiProperty({ type: Boolean, example: true })
	filterableInStorefront: boolean;

	@ApiProperty({ type: Boolean, example: true })
	valueRequired: boolean;

	@ApiProperty({ type: Number, example: 0 })
	storefrontSearchPosition: number;

	@ApiProperty({ enum: InputType, example: InputType.DROPDOWN })
	inputType: InputType;

	@ApiProperty({ enum: Unit, required: false })
	unit?: Unit;
}

export class PublicAttributeDto extends OmitType(AdminAttributeDto, ['privateMetadata']) {
}

export class CreateAttributeDto extends OmitType(AdminAttributeDto, ['id']) implements ICreateAttributeDto {
}

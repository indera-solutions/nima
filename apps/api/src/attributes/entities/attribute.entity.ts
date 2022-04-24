import { ApiProperty } from '@nestjs/swagger';
import { Attribute, InputType, Metadata, Translatable, Unit } from '@nima/interfaces';
import { IsBoolean, IsEnum, IsInt, IsNotEmptyObject, IsObject, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { AttributeValueEntity } from './attributeValue.entity';

@Entity('attribute_attributes')
export class AttributeEntity implements Attribute {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	@IsInt({ context: {} })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Attribute Name' } })
	// @IsObject()
	@IsNotEmptyObject({}, { message: 'Attributes must be named', context: {
			errorCode: 1003,
			developerNote: 'Also you are fat',
		} })
	name: Translatable;

	@Column()
	@ApiProperty({ type: String })
	@IsString()
	slug: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	availableInGrid: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	visibleInStorefront: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	filterableInDashboard: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	filterableInStorefront: boolean;

	@Column({ default: true })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	valueRequired: boolean;

	@Column({ default: 0 })
	@ApiProperty({ type: Number, example: 0 })
	@IsInt()
	storefrontSearchPosition: number;

	@Column({ type: 'enum', enum: InputType })
	@ApiProperty({ enum: InputType, example: InputType.DROPDOWN })
	@IsEnum(InputType)
	inputType: InputType;

	@Column({ type: 'enum', enum: Unit })
	@ApiProperty({ enum: Unit, required: false })
	@IsEnum(Unit)
	@IsOptional()
	unit?: Unit;

	@OneToMany(() => AttributeValueEntity, (value) => value.attribute)
	values: AttributeValueEntity;
}

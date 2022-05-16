import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsBoolean, IsEnum, IsInt, IsNotEmptyObject, IsObject, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { InputType, Unit } from '../dto/attribute.enum';
import { AttributeValueEntity } from './attribute-value.entity';

@Entity('attribute_attributes')
export class AttributeEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	@IsInt()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Attribute Name' } })
	@IsObject()
	@IsNotEmptyObject()
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
	@ApiProperty({ enum: InputType, example: InputType.DROPDOWN, enumName: 'InputType' })
	@IsEnum(InputType)
	inputType: InputType;

	@Column({ type: 'enum', enum: Unit, nullable: true })
	@ApiProperty({ enum: Unit, required: false, enumName: 'Unit' })
	@IsEnum(Unit)
	@IsOptional()
	unit?: Unit;

	@OneToMany(() => AttributeValueEntity, (value) => value.attribute)
	values?: AttributeValueEntity;
}

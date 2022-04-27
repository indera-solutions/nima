import { ApiProperty } from '@nestjs/swagger';
import { Translatable } from '@nima/utils';
import { IsBoolean, IsInt, IsNotEmptyObject, IsObject, IsOptional, IsRFC3339, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { AttributeEntity } from './attribute.entity';

@Entity('attribute_attribute_values')
export class AttributeValueEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Green' } })
	@IsObject()
	@IsNotEmptyObject()
	name: Translatable;

	@Column()
	@ApiProperty({ type: String, example: 'green', required: false })
	@IsString()
	@IsOptional()
	slug?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	@IsInt()
	@IsOptional()
	sortOrder?: number;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Green', required: false })
	@IsString()
	@IsOptional()
	value?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	@IsUrl()
	@IsOptional()
	fileUrl?: string;

	@Column({ type: 'jsonb', nullable: true })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Green' }, required: false })
	@IsObject()
	@IsNotEmptyObject()
	@IsOptional()
	richText?: Translatable;

	@Column({ nullable: true })
	@ApiProperty({ type: Boolean, required: false })
	@IsBoolean()
	@IsOptional()
	boolean?: boolean;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	@IsRFC3339()
	@IsOptional()
	dateTime?: string;

	@ManyToOne(() => AttributeEntity, (attribute) => attribute.values)
	attribute: AttributeEntity;
}

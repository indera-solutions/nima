import { ApiProperty } from '@nestjs/swagger';
import { AttributeValue, Translatable } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { AttributeDto } from '../dto/attribute.dto';
import { AttributeEntity } from './attribute.entity';

@Entity('attribute_attribute_values')
export class AttributeValueEntity implements AttributeValue {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Green' } })
	name: Translatable;

	@Column()
	@ApiProperty({ type: String, example: 'green', required: false })
	slug?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: Number, example: 1, required: false })
	sortOrder?: number;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Green', required: false })
	value?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	fileUrl?: string;

	@Column({ type: 'jsonb', nullable: true })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Green' }, required: false })
	richText?: Translatable;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	boolean?: boolean;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	dateTime?: string;

	@ManyToOne(() => AttributeEntity, (attribute) => attribute.values)
	@ApiProperty({ type: AttributeDto })
	attribute: AttributeEntity;
}

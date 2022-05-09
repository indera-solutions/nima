import { ApiProperty } from '@nestjs/swagger';
import { Translatable } from '@nima/utils';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../dto/translatable.dto';

@Entity('core_media')
export class MediaEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'image/png' })
	mimeType: string;

	@Column()
	@ApiProperty({ type: String, example: 'Media Name' })
	name: string;

	@Column()
	@ApiProperty({ type: String, example: 'media-name' })
	slug: string;

	@Column()
	@ApiProperty({ type: String, example: '' })
	url: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: '', nullable: true })
	thumbnailUrl?: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'alt text' } })
	alt: Translatable;

	@Column()
	@ApiProperty({ type: Number, example: 1024 })
	byteSize: number;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;
}

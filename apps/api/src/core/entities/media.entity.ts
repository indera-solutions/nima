import { ApiProperty } from '@nestjs/swagger';
import { Media } from '@nima/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core_media')
export class MediaEntity implements Media {
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
}

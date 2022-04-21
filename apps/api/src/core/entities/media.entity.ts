import { Media } from '@nima/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core_media')
export class MediaEntity implements Media {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	mimeType: string;

	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	url: string;
}

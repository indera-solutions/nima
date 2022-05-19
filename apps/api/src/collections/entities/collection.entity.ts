import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsInt, IsNotEmptyObject, IsObject, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { MediaEntity } from '../../core/entities/media.entity';
import { CollectionProductsEntity } from './collection-products.entity';

@Entity('collection_collection')
export class CollectionEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Collection Name' } })
	@IsNotEmptyObject()
	name: Translatable;

	@Column({ type: String, unique: true })
	@ApiProperty({ type: String, example: 'collection-name' })
	@IsString()
	slug: string;

	@ManyToOne(() => MediaEntity)
	backgroundImage: MediaEntity;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Description' })
	@IsString()
	seoDescription?: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'SEO Title' })
	@IsString()
	seoTitle?: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Collection Description' } })
	@IsObject()
	description: Translatable;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@OneToMany(() => CollectionProductsEntity, products => products.collection)
	products: CollectionProductsEntity[];
}

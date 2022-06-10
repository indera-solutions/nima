import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ISortableMediaEntity } from '../../core/dto/media.dto';
import { MediaEntity } from '../../core/entities/media.entity';
import { ProductVariantEntity } from './product-variant.entity';

@Entity('product_product_variants_media')
export class ProductVariantMediaEntity implements ISortableMediaEntity {

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;

	@ManyToOne(() => ProductVariantEntity, post => post.productMedia)
	@JoinColumn({ name: 'productVariantId' })
	public productVariant: ProductVariantEntity;

	@PrimaryColumn()
	productVariantId: number;

	@ManyToOne(() => MediaEntity, { eager: true })
	@JoinColumn({ name: 'mediaId' })
	public media!: MediaEntity;

	@PrimaryColumn()
	mediaId: number;
}



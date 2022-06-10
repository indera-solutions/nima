import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ISortableMediaEntity } from '../../core/dto/media.dto';
import { MediaEntity } from '../../core/entities/media.entity';
import { ProductEntity } from './product.entity';

@Entity('product_products_media')
export class ProductMediaEntity implements ISortableMediaEntity {

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;

	@ManyToOne(() => ProductEntity, post => post.productMedia, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'productId' })
	public product: ProductEntity;

	@PrimaryColumn()
	productId: number;

	@ManyToOne(() => MediaEntity, { eager: true })
	@JoinColumn({ name: 'mediaId' })
	public media!: MediaEntity;

	@PrimaryColumn()
	mediaId: number;
}



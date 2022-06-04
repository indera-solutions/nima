import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ISortableMediaEntity } from '../../core/dto/media.dto';
import { MediaEntity } from '../../core/entities/media.entity';
import { ProductEntity } from './product.entity';

@Entity('product_products_media')
export class ProductMediaEntity implements ISortableMediaEntity {

	@Column()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	sortOrder: number;

	@ManyToOne(() => ProductEntity, post => post.productMedia, { primary: true, onDelete: 'CASCADE' })
	public product: ProductEntity;

	@ManyToOne(() => MediaEntity, { primary: true, eager: true, onDelete: 'CASCADE' })
	public media!: MediaEntity;

}



import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { CollectionEntity } from './collection.entity';

@Entity('collection_collection_products')
@Unique('collection_product', ['collection', 'product'])
@Unique('collection_sort_order', ['collection', 'sortOrder'])
export class CollectionProductsEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@ManyToOne(() => CollectionEntity, { onDelete: 'CASCADE' })
	collection: CollectionEntity;

	@ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
	product: ProductEntity;

	@Column()
	@ApiProperty()
	@IsInt()
	sortOrder: number;
}

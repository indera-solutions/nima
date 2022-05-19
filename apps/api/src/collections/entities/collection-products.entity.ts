import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { CollectionEntity } from './collection.entity';

@Entity('collection_collection_products')
export class CollectionProductsEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	id: number;

	@ManyToOne(() => CollectionEntity)
	collection: CollectionEntity;

	@ManyToOne(() => ProductEntity)
	product: ProductEntity;

	@Column()
	@ApiProperty()
	@IsInt()
	sortOrder: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Metadata, ProductType } from '@nima/interfaces';

@Entity()
export class ProductTypeEntity implements ProductType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	hasVariants: boolean;

	@Column()
	isShippingRequired: boolean;

	@Column({ type: 'float' })
	weight: number;

	@Column()
	isDigital: boolean;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column()
	slug: string;
}

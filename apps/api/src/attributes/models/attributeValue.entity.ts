import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@Entity()
export class AttributeValueEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'jsonb', default: {} })
	name: Record<string, string>;

	@Column()
	slug: string;

	@Column({ nullable: true })
	sortOrder: number;

	@Column({ nullable: true })
	value: string;

	@Column({ nullable: true })
	fileUrl: string;

	@Column({ nullable: true })
	richText: string;

	@Column({ nullable: true })
	boolean: string;

	@Column({ nullable: true })
	dateTime: string;

	@ManyToOne(() => AttributeEntity, (attribute) => attribute.values)
	attribute: AttributeEntity;
}

import { Address, LanguageCode, Media, Metadata, User } from '@nima/interfaces';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from '../../core/entities/address.entity';
import { MediaEntity } from '../../core/entities/media.entity';

@Entity()
export class UserEntity implements User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column({ default: false })
	isAdmin: boolean;

	@Column({ default: false })
	isStaff: boolean;

	@Column({ default: false })
	isActive: boolean;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@Column({ nullable: true })
	lastLogin?: string;

	@OneToOne(() => AddressEntity)
	defaultBillingAddress?: Address;

	@OneToOne(() => AddressEntity)
	defaultShippingAddress?: Address;

	@Column({ nullable: true })
	notes?: string;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@ManyToOne(() => MediaEntity, { nullable: true })
	avatar?: Media;

	@Column({ type: 'jsonb', default: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	privateMetadata: Metadata;

	@Column({ type: 'enum', enum: LanguageCode })
	languageCode: LanguageCode;

	@ManyToMany(() => AddressEntity)
	@JoinTable({ name: 'user_user_addresses' })
	addresses: Address[];

	@Column()
	password: string;
}

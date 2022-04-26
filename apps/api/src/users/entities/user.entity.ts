import { ApiProperty } from '@nestjs/swagger';
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
import { AddressDto } from '../../core/dto/address.dto';
import { MediaDto } from '../../core/dto/media.dto';
import { AddressEntity } from '../../core/entities/address.entity';
import { MediaEntity } from '../../core/entities/media.entity';

@Entity('core_users')
export class UserEntity implements User {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'test@example.com' })
	email: string;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	isAdmin: boolean;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	isStaff: boolean;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	isActive: boolean;

	@CreateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	createdAt: string;

	@UpdateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	updatedAt: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: '2022-01-01', required: false })
	lastLogin?: string;

	@OneToOne(() => AddressEntity)
	@ApiProperty({ type: AddressDto, required: false })
	defaultBillingAddress?: Address;

	@OneToOne(() => AddressEntity)
	@ApiProperty({ type: AddressDto, required: false })
	defaultShippingAddress?: Address;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	notes?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	firstName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	lastName?: string;

	@ManyToOne(() => MediaEntity, { nullable: true })
	@ApiProperty({ type: MediaDto, required: false })
	avatar?: Media;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en })
	languageCode: LanguageCode;

	@ManyToMany(() => AddressEntity)
	@JoinTable({ name: 'user_user_addresses' })
	@ApiProperty({ type: [AddressDto] })
	addresses: Address[];

	@Column()
	@ApiProperty({ type: String })
	password: string;
}

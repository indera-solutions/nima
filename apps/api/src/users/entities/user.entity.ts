import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode, Metadata } from '@nima-cms/utils';
import { IsBoolean, IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
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
export class UserEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'test@example.com' })
	@IsEmail()
	email: string;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	@IsBoolean()
	isAdmin: boolean;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	@IsBoolean()
	isStaff: boolean;

	@Column({ default: false })
	@ApiProperty({ type: Boolean, example: false })
	@IsBoolean()
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

	@OneToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto, required: false })
	defaultBillingAddress?: AddressDto;

	@OneToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto, required: false })
	defaultShippingAddress?: AddressDto;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	notes?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	firstName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	lastName?: string;

	@ManyToOne(() => MediaEntity, { nullable: true })
	@ApiProperty({ type: MediaDto, required: false })
	avatar?: MediaDto;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	@IsString()
	languageCode: LanguageCode;

	@ManyToMany(() => AddressEntity)
	@JoinTable({ name: 'user_user_addresses' })
	@ApiProperty({ type: [AddressDto] })
	addresses: AddressDto[];

	@Column()
	@ApiProperty({ type: String })
	password: string;
}

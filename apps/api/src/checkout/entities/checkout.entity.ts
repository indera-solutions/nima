import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode, Metadata } from '@nima-cms/utils';
import { IsBoolean, IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { AddressDto } from '../../core/dto/address.dto';
import { AddressEntity } from '../../core/entities/address.entity';
import { PaymentMethod } from '../../payments/entities/payment.entity';
import { ShippingMethodEntity } from '../../shipping/entities/shipping-method.entity';
import { UserDto } from '../../users/dto/user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { CheckoutLineEntity } from './checkout-line.entity';

@Entity('checkout_checkout')
export class CheckoutEntity {
	@CreateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@UpdateDateColumn()
	@ApiProperty({ type: String, example: '2022-01-01' })
	lastChange: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'test@example.com', required: false })
	@IsEmail()
	email?: string;

	@Column({ type: Boolean, default: true })
	@ApiProperty({ type: Boolean, example: true, required: false })
	@IsBoolean()
	useShippingAsBilling: boolean;

	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ type: String, example: '' })
	token: string;

	@ManyToOne(() => UserEntity, { nullable: true })
	@ApiProperty({ type: UserDto, required: false })
	user?: UserEntity;

	@ManyToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto })
	billingAddress?: AddressEntity;

	@Column({ type: 'float', default: 0.0 })
	@ApiProperty({ type: Number, example: 12.3 })
	discountAmount: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'discount-name', required: false })
	discountName?: string;

	@Column({ type: String, default: '' })
	@ApiProperty({ type: String, example: 'checkout-note' })
	@IsString()
	note: string;

	@ManyToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto })
	shippingAddress?: AddressEntity;

	@ManyToOne(() => ShippingMethodEntity, { nullable: true })
	shippingMethod?: ShippingMethodEntity;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	@IsString()
	@IsOptional()
	voucherCode?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'discount-name', required: false })
	translatedDiscountName?: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	@IsOptional()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	@IsOptional()
	privateMetadata: Metadata;

	@Column({ type: String, default: 'EUR' })
	@ApiProperty({ type: String, example: 'EUR' })
	@IsString()
	currency: string;


	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'http://www.example.com/redirect', required: false })
	redirectUrl?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	trackingCode?: string;

	@Column({ enum: LanguageCode, type: 'enum' })
	@ApiProperty({ enum: LanguageCode, enumName: 'LanguageCode' })
	@IsString()
	languageCode: LanguageCode;

	@Column({ enum: PaymentMethod, type: 'enum', default: PaymentMethod.CASH_ON_DELIVERY })
	@ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod' })
	@IsString()
	paymentMethod: PaymentMethod;

	@OneToMany(() => CheckoutLineEntity, line => line.checkout)
	lines?: CheckoutLineEntity[];
}

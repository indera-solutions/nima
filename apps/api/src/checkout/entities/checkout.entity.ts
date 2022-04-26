import { ApiProperty } from '@nestjs/swagger';
import { Address, Checkout, LanguageCode, Metadata, User } from '@nima/interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressDto } from '../../core/dto/address.dto';
import { AddressEntity } from '../../core/entities/address.entity';
import { UserDto } from '../../users/dto/user.dto';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('checkout_checkout')
export class CheckoutEntity implements Checkout {
	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	lastChange: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'test@example.com', required: false })
	email?: string;

	@PrimaryGeneratedColumn('uuid')
	@ApiProperty({ type: String, example: '' })
	token: string;

	@ManyToOne(() => UserEntity)
	@ApiProperty({ type: UserDto })
	user: User;

	@ManyToOne(() => AddressEntity)
	@ApiProperty({ type: AddressDto })
	billingAddress: Address;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	discountAmount: number;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'discount-name', required: false })
	discountName?: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'checkout-note' })
	note: string;

	@ManyToOne(() => AddressEntity)
	@ApiProperty({ type: AddressDto })
	shippingAddress: Address;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	shipping_method_id;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	voucherCode?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'discount-name', required: false })
	translatedDiscountName?: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	currency: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'Greece' })
	country: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'http://www.example.com/redirect', required: false })
	redirectUrl?: string;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'ASDF123', required: false })
	trackingCode?: string;

	@Column({ enum: LanguageCode, type: 'enum' })
	@ApiProperty({ enum: LanguageCode })
	languageCode: LanguageCode;
}

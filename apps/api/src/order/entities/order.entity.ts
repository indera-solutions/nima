import { ApiProperty } from '@nestjs/swagger';
import { Address, LanguageCode, Metadata, Order, OrderStatus, User } from '@nima/interfaces';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AddressDto } from '../../core/dto/address.dto';
import { AddressEntity } from '../../core/entities/address.entity';
import { UserDto } from '../../users/dto/user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderDto } from '../dto/order.dto';

@Entity('orders_orders')
export class OrderEntity implements Order {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	created: string;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '' })
	updatedAt: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '123ABC456', description: 'shipping tracking id' })
	trackingClientId: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'test@example.com' })
	userEmail: string;

	@ManyToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto, required: false })
	billingAddress?: Address;

	@ManyToOne(() => AddressEntity, { nullable: true })
	@ApiProperty({ type: AddressDto, required: false })
	shippingAddress?: Address;

	@ManyToOne(() => UserEntity, { nullable: true })
	@ApiProperty({ type: UserDto, required: false })
	user?: User;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalNetAmount: number;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	voucher_id?: number;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	languageCode: LanguageCode;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	shippingPriceGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	shippingPriceNetAmount: number;

	@Column({ type: 'enum', enum: OrderStatus })
	@ApiProperty({ enum: OrderStatus, example: OrderStatus.DRAFT, enumName: 'OrderStatus' })
	status: OrderStatus;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'Same Day Delivery', required: false })
	shippingMethodName?: string;

	@Column({ type: Number, nullable: true })
	@ApiProperty({ type: Number, example: 'Same Day Delivery', required: false })
	shippingMethodId?: number;

	@Column({ type: Boolean })
	@ApiProperty({ type: Boolean, example: true })
	displayGrossPrices: boolean;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	customerNote: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	weight: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	checkoutToken: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	currency: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	privateMetadata: Metadata;
	// channel_id

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '', required: false })
	redirectUrl?: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	shippingTaxRate: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedTotalGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	undiscountedTotalNetAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalPaidAmount: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	origin: string;

	@ManyToOne(() => OrderEntity, { nullable: true })
	@ApiProperty({ type: OrderDto, required: false })
	original?: Order;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	searchDocument: string;
}

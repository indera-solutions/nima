import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode, Metadata } from '@nima-cms/utils';
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	RelationId,
	UpdateDateColumn,
} from 'typeorm';
import { AddressDto } from '../../core/dto/address.dto';
import { AddressEntity } from '../../core/entities/address.entity';
import { DiscountVoucherEntity } from '../../discounts/entities/discount-voucher.entity';
import { PaymentEntity } from '../../payments/entities/payment.entity';
import { ShippingMethodEntity } from '../../shipping/entities/shipping-method.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderStatus } from '../dto/order.enum';
import { OrderEventEntity } from './order-event.entity';
import { OrderLineEntity } from './order-line.entity';

@Entity('orders_orders')
export class OrderEntity {
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
	@IsEmail()
	userEmail: string;

	@ManyToOne(() => AddressEntity, { nullable: true, eager: true })
	@ApiProperty({ type: AddressDto, required: false })
	@IsObject()
	@IsOptional()
	billingAddress?: AddressEntity;

	@ManyToOne(() => AddressEntity, { nullable: true, eager: true })
	@ApiProperty({ type: AddressDto, required: false })
	@IsObject()
	@IsOptional()
	shippingAddress?: AddressEntity;

	@ManyToOne(() => UserEntity, { nullable: true })
	user?: UserEntity;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	totalNetAmount: number;

	@ManyToOne(() => DiscountVoucherEntity, { nullable: true, deferrable: 'INITIALLY DEFERRED' })
	voucher?: DiscountVoucherEntity;

	@RelationId((order: OrderEntity) => order.voucher)
	voucherId?: number;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	@IsEnum(LanguageCode)
	languageCode: LanguageCode;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	shippingPriceGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	totalGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	shippingPriceNetAmount: number;

	@Column({ type: 'enum', enum: OrderStatus })
	@ApiProperty({ enum: OrderStatus, example: OrderStatus.DRAFT, enumName: 'OrderStatus' })
	@IsEnum(OrderStatus)
	status: OrderStatus;

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: 'Same Day Delivery', required: false })
	@IsString()
	@IsOptional()
	shippingMethodName?: string;

	// @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH_ON_DELIVERY })
	// @ApiProperty({ type: 'enum', enum: PaymentMethod, enumName: 'PaymentMethod', required: false })
	// @IsEnum(PaymentMethod)
	// @IsOptional()
	// paymentMethod?: PaymentMethod;

	@ManyToOne(() => ShippingMethodEntity, { nullable: true, eager: true })
	shippingMethod?: ShippingMethodEntity;

	@Column({ type: Boolean })
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	displayGrossPrices: boolean;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	@IsString()
	customerNote: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	weight: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	@IsNumber()
	checkoutToken: string;

	@Column({ type: String })
	@ApiProperty({ type: String, example: 'EUR' })
	@IsNumber()
	currency: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;
	// channel_id

	@Column({ type: String, nullable: true })
	@ApiProperty({ type: String, example: '', required: false })
	@IsOptional()
	redirectUrl?: string;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	shippingTaxRate: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	undiscountedTotalGrossAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	undiscountedTotalNetAmount: number;

	@Column({ type: 'float' })
	@ApiProperty({ type: Number, example: 12.3 })
	@IsNumber()
	totalPaidAmount: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	@IsString()
	origin: string;

	@ManyToOne(() => OrderEntity, { nullable: true })
	@IsOptional()
	original?: OrderEntity;

	@Column({ type: String, nullable: true })
	searchDocument: string;

	@OneToMany(() => OrderLineEntity, line => line.order, { eager: true })
	lines: OrderLineEntity[];

	@OneToMany(() => OrderEventEntity, event => event.order, { eager: true })
	events: OrderEventEntity[];

	@OneToOne(() => PaymentEntity)
	@JoinColumn()
	payment: PaymentEntity;


}

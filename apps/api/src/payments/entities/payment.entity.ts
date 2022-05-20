import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum PaymentMethod {
	CARD = 'CARD',
	CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
	BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum PaymentStatus {
	PROCESSING = 'PROCESSING',
	CAPTURED = 'CAPTURED',
	ERROR = 'ERROR',
	PENDING = 'PENDING',
	CANCELED = 'CANCELED',
	REFUSED = 'REFUSED',

}

@Entity('payment_payments')
export class PaymentEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	@IsInt()
	id: number;

	@ApiProperty({ enum: PaymentMethod, enumName: 'PaymentMethod' })
	@Column({ type: 'enum', enum: PaymentMethod })
	method: PaymentMethod;

	@ApiProperty({ enum: PaymentStatus, enumName: 'PaymentStatus' })
	@Column({ type: 'enum', enum: PaymentStatus })
	status: PaymentStatus;


	@CreateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	dateCreated: Date;

	@UpdateDateColumn({ type: String })
	@ApiProperty({ type: String, example: '2022-01-01' })
	dateUpdated: Date;


	@Column({ type: Number, nullable: true })
	@ApiProperty()
	supportRefId?: number;
	@Column({ type: 'float' })
	@ApiProperty()
	amount: number;

	@Column({ type: String, nullable: true })
	@ApiProperty()
	customerId: string;
	@Column({ type: String, nullable: true })
	@ApiProperty()
	description?: string;
	@Column({ type: String, default: 'EUR' })
	@ApiProperty()
	currency: string;
	@Column({ type: String, nullable: true })
	@ApiProperty()
	referenceId?: string;
	@Column({ type: String, nullable: true })
	@ApiProperty()
	transactionTicket?: string;

}

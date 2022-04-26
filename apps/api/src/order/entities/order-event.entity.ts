import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Order, OrderEvent, OrderEventsEnum, User } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../../users/dto/user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderEntity } from './order.entity';

@Entity('orders_order_events')
export class OrderEventEntity implements OrderEvent {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: String })
	@ApiProperty({ type: String, example: '' })
	date: string;

	@Column({ type: 'enum', enum: OrderEventsEnum })
	@ApiProperty({ enum: OrderEventsEnum, enumName: 'OrderEventsEnum' })
	eventType: OrderEventsEnum;

	@ManyToOne(() => OrderEntity)
	@ApiProperty({ type: OrderDto })
	order: Order;

	@ManyToOne(() => UserEntity)
	@ApiProperty({ type: UserDto })
	user: User;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	parameters: Metadata;
}

import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '@nima-cms/utils';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserDto } from '../../users/dto/user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderDto } from '../dto/order.dto';
import { OrderEventsEnum } from '../dto/order.enum';
import { OrderEntity } from './order.entity';

@Entity('orders_order_events')
export class OrderEventEntity {
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
	order: OrderDto;

	@ManyToOne(() => UserEntity)
	@ApiProperty({ type: UserDto })
	user: UserDto;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	parameters: Metadata;
}

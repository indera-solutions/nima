import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShippingZoneEntity } from './shipping-zone.entity';

export enum ShippingMethodType {
	FLAT_RATE = 'FLAT_RATE',
	FREE_SHIPPING = 'FREE_SHIPPING',
	LOCAL_PICKUP = 'LOCAL_PICKUP',
	BY_WEIGHT = 'BY_WEIGHT',
}

@Entity('shipping_rate')
export class ShippingRateEntity {

	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number;


	@Column({ type: 'float', nullable: true })
	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	maximumOrderWeight?: number;

	@Column({ type: 'float', nullable: true })
	@ApiProperty({ required: false })
	@IsNumber()
	@IsOptional()
	minimumOrderWeight?: number;


	@Column({ type: 'float', nullable: true })
	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	maximumPrice?: number;

	@Column({ type: 'float', nullable: true })
	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	minimumPrice?: number;

	@Column({ type: 'float', default: 0.0 })
	@ApiProperty()
	@IsNumber()
	rate: number;

	@Column({ type: 'enum', enum: ShippingMethodType })
	@ApiProperty({ enum: ShippingMethodType, enumName: 'ShippingMethodType' })
	@IsEnum(ShippingMethodType)
	shippingType: ShippingMethodType;

	@Column({ type: Number, nullable: true })
	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	maximumDeliveryDays?: number;

	@Column({ type: Number, nullable: true })
	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	minimumDeliveryDays?: number;

	@ManyToOne(() => ShippingZoneEntity, { onDelete: 'CASCADE' })
	shippingZone: ShippingZoneEntity;

}

import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsEnum, IsInt, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ShippingZoneEntity } from './shipping-zone.entity';

export enum ShippingMethodType {
	FLAT_RATE = 'FLAT_RATE',
	FREE_SHIPPING = 'FREE_SHIPPING',
	LOCAL_PICKUP = 'LOCAL_PICKUP',
	BY_WEIGHT = 'BY_WEIGHT',
	BY_PRICE = 'BY_PRICE',
}


@Entity('shipping_shipping')
export class ShippingMethodEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	id: number;

	@Column()
	@ApiProperty({ type: String })
	@IsString()
	name: string;

	@Column()
	@ApiProperty({ type: 'float' })
	@IsNumber()
	@IsOptional()
	maximumOrderWeight?: number;

	@Column()
	@ApiProperty({ type: 'float', default: 0.0 })
	@IsNumber()
	@IsOptional()
	minimumOrderWeight?: number;

	@Column({ type: 'enum', enum: ShippingMethodType })
	@ApiProperty({ enum: ShippingMethodType, enumName: 'ShippingZoneMethodType' })
	@IsEnum(ShippingMethodType)
	shippingType: ShippingMethodType;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column()
	@ApiProperty({ type: Number })
	@IsInt()
	@IsOptional()
	maximumDeliveryDays?: number;

	@Column()
	@ApiProperty({ type: Number, default: 0 })
	@IsInt()
	@IsOptional()
	minimumDeliveryDays?: number;

	@Column()
	@ApiProperty({ type: 'float', default: 0.0 })
	@IsNumber()
	@IsOptional()
	threshold?: number;

	@Column()
	@ApiProperty({ type: 'float', default: 0.0 })
	@IsNumber()
	@IsOptional()
	rate?: number;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Description' } })
	@IsObject()
	description: Translatable;

	@OneToMany(() => ShippingZoneEntity, zone => zone.shippingMethod)
	shippingZones: ShippingZoneEntity[];
}

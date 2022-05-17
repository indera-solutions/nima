import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsEnum, IsObject, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ShippingMethodEntity } from './shipping-method.entity';

export enum ShippingZoneLocationType {
	COUNTRY = 'COUNTRY',
	STATE = 'STATE',
	CONTINENT = 'CONTINENT',
	POSTAL = 'POSTAL',
}

@Entity('shipping_shipping_zones')
export class ShippingZoneEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	id: number;

	@Column()
	@ApiProperty({ type: String })
	@IsString()
	name: string;

	@Column({ type: 'enum', enum: ShippingZoneLocationType })
	@ApiProperty({ enum: ShippingZoneLocationType, enumName: 'ShippingZoneLocationType' })
	@IsEnum(ShippingZoneLocationType)
	locationType: ShippingZoneLocationType;

	@Column({ type: String, default: [], array: true })
	@ApiProperty({ type: String, isArray: true })
	@IsString({ each: true })
	locationCodes: string[];

	@ManyToOne(() => ShippingMethodEntity, method => method.shippingZones)
	shippingMethod: ShippingMethodEntity;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Product Description' } })
	@IsObject()
	description: Translatable;
}

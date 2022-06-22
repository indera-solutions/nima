import { ApiProperty } from '@nestjs/swagger';
import { Metadata, Translatable } from '@nima-cms/utils';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TranslatableDto } from '../../core/dto/translatable.dto';
import { ShippingZoneEntity } from './shipping-zone.entity';


@Entity('shipping_shipping')
export class ShippingMethodEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number })
	id: number;

	@Column()
	@ApiProperty({ type: String })
	@IsString()
	name: string;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	metadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: Object, example: {} })
	@IsObject()
	privateMetadata: Metadata;

	@Column({ type: 'jsonb', default: {} })
	@ApiProperty({ type: TranslatableDto, example: { en: 'Shipping Method Description' } })
	@IsObject()
	@IsOptional()
	description: Translatable;

	@OneToMany(() => ShippingZoneEntity, zone => zone.shippingMethod, { onDelete: 'CASCADE' })
	shippingZones: ShippingZoneEntity[];

	@DeleteDateColumn()
	deletedAt?: Date;
}

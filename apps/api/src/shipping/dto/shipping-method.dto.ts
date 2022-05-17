import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';
import { CreateShippingZoneDto, ShippingZoneDto } from './shipping-zone.dto';


export class ShippingMethodDto extends OmitType(ShippingMethodEntity, ['shippingZones']) {
	@ApiProperty({ type: () => ShippingZoneDto, isArray: true })
	shippingZones: ShippingZoneDto[];
}

export class CreateShippingMethodDto extends OmitType(ShippingMethodDto, ['id', 'shippingZones']) {
	@ApiProperty({ type: () => CreateShippingZoneDto, isArray: true })
	@IsObject({ each: true })
	shippingZones: CreateShippingZoneDto[];
}

export class UpdateShippingMethodDto extends PartialType(CreateShippingMethodDto) {
}

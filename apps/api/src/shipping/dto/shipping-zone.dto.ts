import { OmitType, PartialType } from '@nestjs/swagger';
import { ShippingZoneEntity } from '../entities/shipping-zone.entity';

export class ShippingZoneDto extends OmitType(ShippingZoneEntity, ['shippingMethod']) {
}

export class CreateShippingZoneDto extends OmitType(ShippingZoneDto, ['id']) {
}

export class UpdateShippingZoneDto extends PartialType(CreateShippingZoneDto) {
}

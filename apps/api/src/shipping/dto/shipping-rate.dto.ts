import { OmitType, PartialType } from '@nestjs/swagger';
import { ShippingMethodType, ShippingRateEntity } from '../entities/shipping-rate.entity';

export class ShippingRateDto extends OmitType(ShippingRateEntity, ['shippingZone']) {

	static prepare(entity: ShippingRateEntity, options?: { isAdmin?: boolean }): ShippingRateDto {
		return {
			id: entity.id,
			maximumDeliveryDays: entity.maximumDeliveryDays,
			rate: entity.rate,
			maximumOrderWeight: entity.maximumOrderWeight,
			minimumDeliveryDays: entity.minimumDeliveryDays,
			minimumOrderWeight: entity.minimumOrderWeight,
			shippingType: ShippingMethodType[entity.shippingType],
			maximumPrice: entity.maximumPrice,
			minimumPrice: entity.minimumPrice,
		};
	}
}

export class CreateShippingRateDto extends OmitType(ShippingRateDto, ['id']) {
}

export class UpdateShippingRateDto extends PartialType(CreateShippingRateDto) {
}

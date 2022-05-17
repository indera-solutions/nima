import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';

@EntityRepository(ShippingMethodEntity)
export class ShippingMethodRepository extends BaseRepository<ShippingMethodEntity> {
	getFullObjects(): Promise<ShippingMethodEntity[]> {
		return this.find({
			relations: ['shippingZones'],
		});
	}

	getFullObject(id: number): Promise<ShippingMethodEntity> {
		return this.findOne({
			where: { id: id },
		});
	}
}

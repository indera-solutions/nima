import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ShippingZoneEntity } from '../entities/shipping-zone.entity';

@EntityRepository(ShippingZoneEntity)
export class ShippingZoneRepository extends BaseRepository<ShippingZoneEntity> {
	async getFullObject(id: number) {
		return this.findOne({
			where: {
				id: id,
			},
		});
	}
}

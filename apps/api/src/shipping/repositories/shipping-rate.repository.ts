import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ShippingRateEntity } from '../entities/shipping-rate.entity';

@EntityRepository(ShippingRateEntity)
export class ShippingRateRepository extends BaseRepository<ShippingRateEntity> {

}

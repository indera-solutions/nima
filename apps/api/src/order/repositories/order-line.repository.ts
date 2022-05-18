import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderLineEntity } from '../entities/order-line.entity';

@EntityRepository(OrderLineEntity)
export class OrderLineRepository extends BaseRepository<OrderLineEntity> {
}

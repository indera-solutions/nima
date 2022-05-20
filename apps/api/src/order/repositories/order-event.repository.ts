import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderEventEntity } from '../entities/order-event.entity';

@EntityRepository(OrderEventEntity)
export class OrderEventRepository extends BaseRepository<OrderEventEntity> {

}

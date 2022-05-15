import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderEntity } from './order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {

	findById(id: number) {
		return this.findOne({
			where: {
				id: id,
			},
		});
	}

	deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}
}

import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderEntity } from '../entities/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {

	findPaginated(take: number, skip: number) {
		return this.findAndCount({
			take: take,
			skip: skip,
			order: {
				created: 'DESC',
			},
		});
	}

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

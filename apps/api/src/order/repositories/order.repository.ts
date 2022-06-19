import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderStatus } from '../dto/order.enum';
import { OrderEntity } from '../entities/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {

	findPaginated(take: number, skip: number, filters: { status?: OrderStatus }) {
		const where = {};
		if ( filters ) {
			if ( filters.status ) where['status'] = filters.status;
		}
		return this.findAndCount({
			take: take,
			skip: skip,
			order: {
				created: 'DESC',
			},
			where,
		});
	}

	findById(id: number) {
		return this.findOne({
			where: {
				id: id,
			},
		});
	}

	findOfUser(userId: number) {
		return this.find({
			where: {
				user: {
					id: userId,
				},
			},
			relations: ['voucher'],
		});
	}

	deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}
}

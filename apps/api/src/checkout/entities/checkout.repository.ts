import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CheckoutEntity } from './checkout.entity';

@EntityRepository(CheckoutEntity)
export class CheckoutRepository extends BaseRepository<CheckoutEntity> {
	findByToken(token: string) {
		return this.findOne({
			where: {
				token: token,
			},
		});
	}

	findByUserId(userId: number) {
		return this.findOne({
			where: {
				user: {
					id: userId,
				},
			},
		});
	}

	deleteByToken(token: string) {
		return this.delete({
			token: token,
		});
	}
}

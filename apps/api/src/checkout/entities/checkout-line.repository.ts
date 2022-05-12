import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CheckoutLineEntity } from './checkout-line.entity';

@EntityRepository(CheckoutLineEntity)
export class CheckoutLineRepository extends BaseRepository<CheckoutLineEntity> {
	async deleteByVariantAndToken(variantId: number, token: string) {
		return this.delete({
			variant: {
				id: variantId,
			},
			checkout: {
				token: token,
			},
		});
	}
}

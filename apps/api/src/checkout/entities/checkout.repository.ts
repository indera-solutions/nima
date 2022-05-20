import { Connection, EntityRepository, EntitySubscriberInterface, EventSubscriber, LoadEvent, Raw } from 'typeorm';
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

	getWholeObject(token: string) {
		return this.findOne({
			where: {
				token: token,
			},
			relations: ['user', 'billingAddress', 'shippingAddress', 'lines', 'lines.variant', 'shippingMethod'],

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

	deleteExpired() {
		return this.delete({
			lastChange: Raw((alias) => `${ alias } < now() - interval '7 days'`),
		});
	}
}

@EventSubscriber()
export class CheckoutSubscriber implements EntitySubscriberInterface<CheckoutEntity> {
	constructor(connection: Connection) {
		connection.subscribers.push(this);
	}

	listenTo() {
		return CheckoutEntity;
	}

	afterLoad(entity: CheckoutEntity, event?: LoadEvent<CheckoutEntity>): Promise<any> | void {
		// event.manager.getCustomRepository(CheckoutRepository).deleteExpired().then(value => console.dir(value, {
		// depth: 100 }));
	}
}

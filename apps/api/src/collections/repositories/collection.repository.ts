import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CollectionEntity } from '../entities/collection.entity';

@EntityRepository(CollectionEntity)
export class CollectionRepository extends BaseRepository<CollectionEntity> {
	async getFullObject(id: number) {
		return this.findOne({
			relations: ['products', 'products.product', 'products.product.defaultVariant', 'products.product.productMedia'],
			where: {
				id: id,
			},
		});
	}

	async getIdBySlug(slug: string): Promise<number | undefined> {
		const res = await this.findOne({
			where: {
				slug,
			},
			select: ['id'],
		});

		return res?.id;
	}

	async getFullObjects() {
		return this.find({
			relations: ['products', 'products.product', 'products.product.productMedia'],
		});
	}

	async deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}
}

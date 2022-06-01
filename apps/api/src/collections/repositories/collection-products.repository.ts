import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CollectionProductsEntity } from '../entities/collection-products.entity';

@EntityRepository(CollectionProductsEntity)
export class CollectionProductsRepository extends BaseRepository<CollectionProductsEntity> {

	async deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}

	async deleteProductFromCollection(collectionId: number, productId: number) {
		return this.delete({
			collection: {
				id: collectionId,
			},
			product: {
				id: productId,
			},
		});
	}
}

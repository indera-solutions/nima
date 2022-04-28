import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductTypeEntity } from '../entities';

@EntityRepository(ProductTypeEntity)
export class ProductTypeRepository extends BaseRepository<ProductTypeEntity> {

	async getById(id: number) {
		return this.findOne(id);
	}

	async deleteById(id: number) {
		return this.delete(id);
	}
}

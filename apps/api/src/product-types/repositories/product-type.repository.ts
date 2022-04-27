import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeEntity } from '../entities';

@EntityRepository(ProductTypeEntity)
export class ProductTypeRepository extends Repository<ProductTypeEntity> {

	async getById(id: number) {
		return this.findOne(id);
	}

	async deleteById(id: number) {
		return this.delete(id);
	}
}

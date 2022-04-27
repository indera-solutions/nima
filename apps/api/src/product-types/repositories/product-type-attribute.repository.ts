import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeAttributeEntity } from '../entities';

@EntityRepository(ProductTypeAttributeEntity)
export class ProductTypeAttributeRepository extends Repository<ProductTypeAttributeEntity> {

	async getById(attributeId: number) {
		return this.findOne(attributeId, { relations: ['attribute'] });
	}

	async listOfProductType(productTypeId: number) {
		return this.find({
			where: {
				productType: {
					id: productTypeId,
				},
			},
			relations: ['attribute'],
		});
	}

	async deleteById(productTypeAttributeId: number) {
		return this.delete(productTypeAttributeId);
	}
}

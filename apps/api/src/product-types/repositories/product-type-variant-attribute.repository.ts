import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeVariantAttributeEntity } from '../entities';

@EntityRepository(ProductTypeVariantAttributeEntity)
export class ProductTypeVariantAttributeRepository extends Repository<ProductTypeVariantAttributeEntity> {

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

	async getById(productTypeAttributeId: number) {
		return this.findOne(productTypeAttributeId, { relations: ['attribute'] });
	}

	async deleteById(productTypeAttributeId: number) {
		return this.delete(productTypeAttributeId);
	}
}

import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductTypeAttributeEntity } from '../entities';

@EntityRepository(ProductTypeAttributeEntity)
export class ProductTypeAttributeRepository extends BaseRepository<ProductTypeAttributeEntity> {

	async getById(attributeId: number) {
		return this.findOne(attributeId, { relations: ['attribute'] });
	}

	async getByAttributeAndProductTypeId(productTypeId: number, attributeId: number) {
		return this.findOne({
			where: {
				attribute: {
					id: attributeId,
				},
				productType: {
					id: productTypeId,
				},
			},
		});
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

	async deleteByAttributeAndProductTypeId(productTypeId: number, attributeId: number) {
		return this.delete({
			attribute: {
				id: attributeId,
			},
			productType: {
				id: productTypeId,
			},
		});
	}
}

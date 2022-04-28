import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductTypeVariantAttributeEntity } from '../entities';

@EntityRepository(ProductTypeVariantAttributeEntity)
export class ProductTypeVariantAttributeRepository extends BaseRepository<ProductTypeVariantAttributeEntity> {

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

	async getByAttributeAndProductType(productTypeId: number, attributeId: number) {
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

	async deleteById(productTypeAttributeId: number) {
		return this.delete(productTypeAttributeId);
	}

	async deleteByAttributeAndProductType(productTypeId: number, attributeId: number) {
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

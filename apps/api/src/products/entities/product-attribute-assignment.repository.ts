import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './product-attribute-assignment.entity';

@EntityRepository(AssignedProductAttributeEntity)
export class AssignedProductAttributeRepository extends BaseRepository<AssignedProductAttributeEntity> {

	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id,
			},
		});
	}

	async deleteProductAttribute(productId: number, attributeId: number) {
		return await this.delete({
			product: {
				id: productId,
			},
			productTypeAttribute: {
				attribute: {
					id: attributeId,
				},
			},
		});
	}
}

@EntityRepository(AssignedProductVariantAttributeEntity)
export class AssignedProductVariantAttributeRepository extends BaseRepository<AssignedProductVariantAttributeEntity> {

	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id,
			},
		});
	}

	async deleteProductVariantAttribute(variantId: number, attributeId: number) {
		return await this.delete({
			variant: {
				id: variantId,
			},
			productTypeVariantAttribute: {
				attribute: {
					id: attributeId,
				},
			},
		});
	}
}

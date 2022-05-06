import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './product-attribute-value-assignment.entity';

@EntityRepository(AssignedProductAttributeValueEntity)
export class AssignedProductAttributeValueRepository extends BaseRepository<AssignedProductAttributeValueEntity> {

	async deleteProductAttributeValue(assignmentId: number, valueId: number) {
		return await this.delete({
			assignedProductAttribute: {
				id: assignmentId,
			},
			value: {
				id: valueId,
			},
		});
	}
}

@EntityRepository(AssignedProductVariantAttributeValueEntity)
export class AssignedProductVariantAttributeValueRepository extends BaseRepository<AssignedProductVariantAttributeValueEntity> {

	async deleteProductAttributeValue(assignmentId: number, valueId: number) {
		return await this.delete({
			assignedProductVariantAttribute: {
				id: assignmentId,
			},
			value: {
				id: valueId,
			},
		});
	}
}

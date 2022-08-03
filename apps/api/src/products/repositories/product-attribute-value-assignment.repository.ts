import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AssignedProductAttributeEntity } from '../entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../entities/product-attribute-value-assignment.entity';

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

	async getProductIdsOfValueId(valueIds: number[]): Promise<number[]> {
		const res = await this.createQueryBuilder('papav')
							  .select('av."productId"')
							  .distinctOn(['av.productId'])
							  .leftJoin(AssignedProductAttributeEntity, 'av', ' av."id" = papav."assignedProductAttributeId"')
							  .where('papav."valueId" IN (:...valueIds)', { valueIds: valueIds })
							  .getRawMany();
		return res.map(r => r.productId);
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

	async getProductIdsOfValueId(valueIds: number[]): Promise<number[]> {
		const res = await this.createQueryBuilder('papav')
							  .select('av."productId"')
							  .distinctOn(['av.productId'])
							  .leftJoin(AssignedProductAttributeEntity, 'av', ' av."id" = papav."assignedProductAttributeId"')
							  .where('papav."valueId" IN (:...valueIds)', { valueIds: valueIds })
							  .getRawMany();
		return res.map(r => r.productId);
	}
}

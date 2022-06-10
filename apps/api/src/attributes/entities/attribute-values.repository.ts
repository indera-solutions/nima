import { EntityRepository, In, Repository } from 'typeorm';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from '../../products/entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../../products/entities/product-attribute-value-assignment.entity';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { AttributeValueEntity } from './attribute-value.entity';
import { AttributeEntity } from './attribute.entity';

@EntityRepository(AttributeValueEntity)
export class AttributeValuesRepository extends Repository<AttributeValueEntity> {

	async getOfAttribute(attributeId: number) {
		return this.find({ where: { attribute: { id: attributeId } } });
	}

	async deleteById(id: number) {
		return this.delete(id);
	}

	async getSlugAndAttributeSlugOfValues(ids: number[]) {
		const res = await this.find({
			relations: { attribute: true },
			where: { id: In(ids) },
		});
		return res.map(r => ({
			attributeSlug: r.attribute.slug,
			value: r.slug,
		}));
	}

	async attributeDrillDown(ids: number[]): Promise<{ aSlug: string; aId: number; avSlug: string; avId: number; count: string }[]> {
		const res = await this.createQueryBuilder('av')
							  .leftJoin(AttributeEntity, 'a', 'av."attributeId" = a.id')
							  .leftJoin(AssignedProductAttributeValueEntity, 'apav', 'av.id = apav."valueId"')
							  .leftJoin(AssignedProductVariantAttributeValueEntity, 'avav', 'av.id = avav."valueId"')
							  .leftJoin(AssignedProductAttributeEntity, 'apa', 'apa.id = apav."assignedProductAttributeId"')
							  .leftJoin(AssignedProductVariantAttributeEntity, 'ava', 'ava.id = avav."assignedProductVariantAttributeId"')
							  .leftJoin(ProductVariantEntity, 'pv', 'pv.id = ava."variantId"')
							  .leftJoin(ProductEntity, 'p', 'p.id = apa."productId" or p.id = pv."productId"')
							  .where('p.id IN (:...ids)', { ids: ids })
							  .select(['a.id', 'a.slug', 'av.id', 'av.slug'])
							  .addSelect('count(distinct p.id)', 'count')
							  .groupBy('a.id')
							  .addGroupBy('a.slug')
							  .addGroupBy('av.id')
							  .addGroupBy('av.slug')
							  .andWhere('a.filterableInStorefront = true')
							  .getRawMany();
		return res.map(r => ({ aId: r.a_id, aSlug: r.a_slug, avSlug: r.av_slug, avId: r.av_id, count: r.count }));
	}
}

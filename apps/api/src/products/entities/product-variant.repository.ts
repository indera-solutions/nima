import { LanguageCode } from '@nima/utils';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { ProductTypeEntity } from '../../product-types/entities';
import { ProductQueryFilterDto, ProductSorting } from '../dto/product-filtering.dto';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from './product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from './product-attribute-value-assignment.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductEntity } from './product.entity';

@EntityRepository(ProductVariantEntity)
export class ProductVariantRepository extends BaseRepository<ProductVariantEntity> {
	async listProductsAndCounts(productId: number, take: number, skip: number): Promise<{ items: ProductVariantEntity[], count: number }> {
		const res = await this.findAndCount({
			take: take,
			skip: skip,
			where: {
				product: {
					id: productId,
				},
			},
		});
		return {
			items: res[0],
			count: res[1],
		};
	}

	async findById(id: number): Promise<ProductVariantEntity> {
		return await this.findOne({
			where: {
				id: id,
			},
			// relations: ['product'],
		});

		// return await this.createQueryBuilder('proVar')
		// 				 .leftJoinAndSelect('proVar.product', 'product')
		// 				 .leftJoinAndSelect('product.productType', 'productType')
		// 				 .leftJoinAndSelect('productType.attributes', 'productTypeAttr')
		// 				 .leftJoinAndSelect('productType.variantAttributes', 'productTypeVarAttr')
		// 				 .leftJoinAndSelect('product.attributes', 'productAttr')
		// 				 .leftJoinAndSelect('proVar.attributes', 'attributes')
		// 				 .getOne();
	}

	async deleteById(id: number) {
		return await this.delete({
			id: id,
		});
	}

	async findByProductId(productId: number): Promise<ProductVariantEntity[]> {
		return await this.find({
			where: {
				product: {
					id: productId,
				},
			},
		});
	}

	async findFilteredVariantIds(collectionId?: number, categoryIds?: number[], filters?: ProductQueryFilterDto[], search?: string): Promise<{ id: number, price: number }[]> {
		const caQb = this.createQueryBuilder('pv')
						 .select('pv.id', 'id')
						 .addSelect('pv."priceAmount"')
						 .distinctOn(['pv.id'])
						 .where('pv.id IS NOT NULL');
		if ( search ) {
			const query = `'"${ search.trim().replace(' ', '+') }":*'`;
			caQb.andWhere(`to_tsvector(pp.searchDocument) @@ to_tsquery(${ query })`);
		}
		//TODO: Price Handling

		if ( categoryIds ) {
			caQb.andWhere('p."categoryId" IN (:...categoryIds)', {
				categoryIds: categoryIds,
			});
		}

		if ( collectionId ) {
			//TODO: Collection Handling
		}

		if ( filters && filters.length > 0 ) {
			caQb
				.leftJoin(ProductEntity, 'p', 'pv."productId" = p.id')
				.leftJoin(AssignedProductAttributeEntity, `apa`, `p.id = apa."productId"`);

			filters.forEach((value, index) => {
				if ( !value.values || value.values.length === 0 ) return;
				caQb
					.leftJoin(AssignedProductAttributeValueEntity, `apav${ index }`, `apa.id = apav${ index }."assignedProductAttributeId"`)
					.leftJoin(AssignedProductVariantAttributeEntity, `ava${ index }`, `ava${ index }."variantId" = pv.id`)
					.leftJoin(AssignedProductVariantAttributeValueEntity, `avav${ index }`, `avav${ index }."assignedProductVariantAttributeId" = ava${ index }.id`)
					.andWhere(`(avav${ index }."valueId" IN (:...values${ index }) OR apav${ index }."valueId" IN (:...values${ index }))`, { [`values${ index }`]: value.values });
			});
		}

		const res = await caQb.getRawMany();
		return res.map(r => ({ id: Number(r.id), price: Number(r.price) }));
	}

	async findByIdsWithSorting(ids: number[], skip?: number, take?: number, sorting?: ProductSorting, language: LanguageCode = LanguageCode.en): Promise<ProductVariantEntity[]> {
		const q = this.createQueryBuilder('product_variants')
					  .leftJoin(ProductEntity, 'products', 'product_variants."productId" = products.id')
					  .leftJoin(ProductTypeEntity, 'product-type', 'products."productTypeId" = product-type.id')
					  .whereInIds(ids)
					  .skip(skip)
					  .take(take);

		if ( sorting ) {
			if ( sorting === ProductSorting.NAME_ASC || sorting === ProductSorting.NAME_DESC ) {
				q.orderBy(`CASE WHEN products.name ? '${ language }' THEN products.name ->> '${ language }' ELSE products.name ->> 'en' END`, sorting === ProductSorting.NAME_ASC ? 'ASC' : 'DESC', 'NULLS LAST');
			} else if ( sorting === ProductSorting.PRICE_ASC || sorting === ProductSorting.PRICE_DESC ) {
				q.orderBy('CASE WHEN products.salePrice IS NOT NULL THEN products.salePrice ELSE products.price END', sorting === ProductSorting.PRICE_ASC ? 'ASC' : 'DESC', 'NULLS LAST');
			} else if ( sorting === ProductSorting.DATE_CREATED_ASC || sorting === ProductSorting.DATE_CREATED_DESC ) {
				q.orderBy(`products.createdAt`, sorting === ProductSorting.DATE_CREATED_ASC ? 'ASC' : 'DESC', 'NULLS LAST');
			} else if ( sorting === ProductSorting.RATING_ASC || sorting === ProductSorting.RATING_DESC ) {
				q.orderBy(`products.rating`, sorting === ProductSorting.RATING_ASC ? 'ASC' : 'DESC', 'NULLS LAST');
			}
		}

		return await q.getMany();
	}

	async attributeDrillDown(ids: number[]): Promise<{ aSlug: string; aId: number; avSlug: string; avId: number; count: string }[]> {
		const apaSq = this.manager
						  .getRepository(AssignedProductAttributeEntity)
						  .createQueryBuilder('apa')
						  .select('apa."productId"')
						  .addSelect('NULL', 'variantId')
						  .addSelect('apav."valueId"')
						  .leftJoin(AssignedProductAttributeValueEntity, 'apav', 'apa.id = apav."assignedProductAttributeId"');
		const avaSq = this.manager
						  .getRepository(AssignedProductVariantAttributeEntity)
						  .createQueryBuilder('ava')
						  .select('NULL', 'productId')
						  .addSelect('ava."variantId"')
						  .addSelect('avav."valueId"')
						  .leftJoin(AssignedProductVariantAttributeValueEntity, 'avav', 'ava.id = avav."assignedProductVariantAttributeId"');

		const res = await this.createQueryBuilder('pv')
							  .leftJoin(ProductEntity, 'p', 'p.id = pv."productId"')
							  .leftJoin(`( ${ apaSq.getQuery() } UNION ${ avaSq.getQuery() } )`, 'apav', 'p.id = apav."productId" or pv.id = apav."variantId"')
							  .leftJoin(AttributeValueEntity, 'av', 'av.id = apav."valueId"')
							  .leftJoin(AttributeEntity, 'a', 'a.id = av."attributeId"')
							  .where('pv.id IN (:...ids)', { ids: ids })
							  .select(['a.id', 'a.slug', 'av.id', 'av.slug'])
							  .addSelect('count(av.slug)', 'count')
							  .groupBy('a.id')
							  .addGroupBy('a.slug')
							  .addGroupBy('av.id')
							  .addGroupBy('av.slug')
							  .getRawMany();
		return res.map(r => ({ aId: r.a_id, aSlug: r.a_slug, avSlug: r.av_slug, avId: r.av_id, count: r.count }));
	}
}

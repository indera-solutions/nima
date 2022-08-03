import { LanguageCode } from '@nima-cms/utils';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
import { AttributeEntity } from '../../attributes/entities/attribute.entity';
import { CollectionProductsEntity } from '../../collections/entities/collection-products.entity';
import { ProductQueryIdFilterDto, ProductSorting } from '../dto/product-filtering.dto';
import {
	AssignedProductAttributeEntity,
	AssignedProductVariantAttributeEntity,
} from '../entities/product-attribute-assignment.entity';
import {
	AssignedProductAttributeValueEntity,
	AssignedProductVariantAttributeValueEntity,
} from '../entities/product-attribute-value-assignment.entity';
import { ProductVariantEntity } from '../entities/product-variant.entity';
import { ProductEntity } from '../entities/product.entity';

@EntityRepository(ProductVariantEntity)
export class ProductVariantRepository extends BaseRepository<ProductVariantEntity> {
	async getFullObject(variantId: number) {
		return this.findOne({
			where: {
				id: variantId,
			},
			relations: ['product', 'product.category', 'product.collections', 'product.collections.collection'],
		});
	}

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

	async findIdsByProductId(productId: number): Promise<number[]> {
		const res = await this.find({
			where: {
				product: {
					id: productId,
				},
			},
			select: ['id'],
		});
		return res.map(r => r.id);
	}

	async getProductIdOfVariant(variantId: number): Promise<number | undefined> {
		const res = await this.createQueryBuilder('v')
							  .select('product.id')
							  .where('v.id === :id', { id: variantId })
							  .getRawOne<{ productId: number }>();
		return res?.productId || undefined;
	}

	async findFilteredVariantIds(collectionId?: number, categoryIds?: number[], filters?: ProductQueryIdFilterDto[], search?: string): Promise<number[]> {
		const caQb = this.createQueryBuilder('pv')
						 .select('pv.id', 'id')
						 .distinctOn(['pv.id'])
						 .leftJoin(ProductEntity, 'p', 'pv."productId" = p.id')
						 .where('p."isPublished" = true');
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
			caQb.leftJoin(CollectionProductsEntity, 'copr', `p.id = copr."productId"`)
				.andWhere(`copr."collectionId" = :collectionId`, { collectionId: collectionId });
		}

		if ( filters && filters.length > 0 ) {
			caQb
				.leftJoin(AssignedProductAttributeEntity, `apa`, `p.id = apa."productId"`);

			filters.forEach((value, index) => {
				if ( !value.values || value.values.length === 0 ) return;
				caQb
					.leftJoin(AssignedProductAttributeValueEntity, `apav${ index }`, `apa.id = apav${ index }."assignedProductAttributeId"`)
					.leftJoin(AssignedProductVariantAttributeEntity, `ava${ index }`, `ava${ index }."variantId" = pv.id`)
					.leftJoin(AssignedProductVariantAttributeValueEntity, `avav${ index }`, `avav${ index }."assignedProductVariantAttributeId" = ava${ index }.id`)
					.leftJoin(AttributeValueEntity, `av1${ index }`, `avav${ index }."valueId" = av1${ index }.id`)
					.leftJoin(AttributeValueEntity, `av2${ index }`, `apav${ index }."valueId" = av2${ index }.id`)
					.andWhere(`(av1${ index }."slug" IN (:...values${ index }) OR av2${ index }."slug" IN (:...values${ index }))`, { [`values${ index }`]: value.values });
			});
		}

		const res = await caQb.getRawMany();
		return res.map(r => Number(r.id));
	}

	async findByIdsWithSorting(ids: number[], skip?: number, take?: number, sorting?: ProductSorting, language: LanguageCode = LanguageCode.en): Promise<ProductVariantEntity[]> {
		const q = this.createQueryBuilder('pv')
					  .leftJoinAndSelect('pv.product', 'p')
					  .leftJoinAndSelect('p.productType', 'pt')
					  .leftJoinAndSelect('p.category', 'c')
					  .leftJoinAndSelect('p.attributes', 'att')
					  .leftJoinAndSelect('att.values', 'aval')
					  .leftJoinAndSelect('aval.value', 'avalval')
					  .leftJoinAndSelect('att.productTypeAttribute', 'pta')
					  .leftJoinAndSelect('pta.attribute', 'attr')
					  .leftJoinAndSelect('pv.productMedia', 'pmedia')
					  .leftJoinAndSelect('pmedia.media', 'pmediaMedia');

		if ( sorting ) {
			if ( sorting === ProductSorting.NAME_ASC || sorting === ProductSorting.NAME_DESC ) {
				q.addSelect(`CASE WHEN "p".name ? '${ language }' THEN "p".name ->> '${ language }' ELSE "p".name ->> 'en' END`, 'sortcolumn');
			} else if ( sorting === ProductSorting.PRICE_ASC || sorting === ProductSorting.PRICE_DESC ) {
				q.addSelect(`p."minPrice"`, 'sortcolumn');
			} else if ( sorting === ProductSorting.DATE_CREATED_ASC || sorting === ProductSorting.DATE_CREATED_DESC ) {
				q.addSelect(`p."created"`, 'sortcolumn');
			} else if ( sorting === ProductSorting.RATING_ASC || sorting === ProductSorting.RATING_DESC ) {
				q.addSelect(`p."rating"`, 'sortcolumn');
			}
			const isAsc = sorting === ProductSorting.RATING_ASC || sorting === ProductSorting.NAME_ASC || sorting === ProductSorting.PRICE_ASC || sorting === ProductSorting.DATE_CREATED_ASC;
			q.orderBy(`sortcolumn`, isAsc ? 'ASC' : 'DESC', 'NULLS LAST');

		}
		q.skip(skip)
		 .take(take)
		 .whereInIds(ids);

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

	async getTrackedStockVariantsByIds(productVariantIds: number[]): Promise<ProductVariantEntity[]> {
		return this.findByIds(productVariantIds, {
			where: {
				trackInventory: true,
			},
			loadEagerRelations: false,
		});
	}

	async returnStock(productVariantSku: string, stock: number): Promise<void> {
		await this.createQueryBuilder()
				  .update(ProductVariantEntity)
				  .where('sku = :sku', { sku: productVariantSku })
				  .andWhere(`"trackInventory" = true`)
				  .set({ stock: () => `stock + ${ stock }` })
				  .execute();
	}

	async removeStock(productVariantId: number, stock: number): Promise<void> {
		await this.createQueryBuilder()
				  .update(ProductVariantEntity)
				  .where('id = :id', { id: productVariantId })
				  .andWhere(`"trackInventory" = true`)
				  .set({
					  stock: () => `stock - ${ stock }`,
				  })
				  .execute();
	}
}

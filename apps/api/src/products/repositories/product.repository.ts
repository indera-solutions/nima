import { LanguageCode, searchPrepare } from '@nima-cms/utils';
import { EntityRepository, In } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CollectionProductsEntity } from '../../collections/entities/collection-products.entity';
import { ProductQueryIdFilterDto, ProductSorting } from '../dto/product-filtering.dto';
import { ProductEntity } from '../entities/product.entity';

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {

	async listProductsAndCounts(take: number, skip: number): Promise<{ items: ProductEntity[], count: number }> {
		const options = {
			take: take,
			skip: skip,
		};
		const res = await this.findAndCount(options);
		return {
			items: res[0],
			count: res[1],
		};
	}

	async findById(id: number): Promise<ProductEntity> {
		return await this.findOne({
			relations: ['productMedia', 'attributes', 'productType', 'category', 'collections', 'collections.collection'],
			where: {
				id: id,
			},
		});
	}

	async deleteById(id: number) {
		return await this.delete({
			id: id,
		});
	}

	async findFilteredProductIds(collectionId?: number, categoryIds?: number[], filters?: ProductQueryIdFilterDto[], search?: string, isStaff?: boolean): Promise<{
		id: number,
		priceAmount: number,
		discountedPrice: number,
	}[]> {
		const caQb = this.createQueryBuilder('p')
						 .leftJoin('p.defaultVariant', 'dpv')
						 .select('p.id', 'id')
						 .addSelect('dpv.priceAmount', 'priceAmount')
						 .addSelect('dpv.discountedPrice', 'discountedPrice')
						 .distinctOn(['p.id']);


		if ( !isStaff ) {
			caQb.where('p."isPublished" = true');
		}

		if ( search ) {
			const searchStr = searchPrepare(search);
			caQb.andWhere(`to_tsvector(p.searchDocument) @@ to_tsquery(:s)`, { s: searchStr });
		}

		if ( categoryIds ) {
			caQb.andWhere('p."categoryId" IN (:...categoryIds)', {
				categoryIds: categoryIds,
			});
		}

		if ( collectionId ) {
			caQb.leftJoin(CollectionProductsEntity, 'collection', `collection."productId" = p.id`);
			caQb.andWhere('collection."collectionId" IN (:...collectionIds)', {
				collectionIds: [collectionId],
			});
		}

		if ( filters && filters.length > 0 ) {
			filters.forEach(filter => {
				caQb.andWhere(`p.id IN (SELECT DISTINCT ON ("av"."productId") av."productId" AS "productId"
               FROM "products_assigned_product_attribute_values" "papav"
                        LEFT JOIN "products_assigned_product_attributes" "av"
                                  ON av."id" = papav."assignedProductAttributeId"
               WHERE papav."valueId" IN (:...valueIds${ filter.attributeId })
               UNION
               SELECT DISTINCT on (ppv."productId") ppv."productId" AS "productId"
               FROM "products_assigned_product_variant_attribute_values" papvav
                        LEFT JOIN "products_assigned_product_variant_attributes" "av"
                                  ON av."id" = papvav."assignedProductVariantAttributeId"
                        LEFT join products_product_variants ppv on av."variantId" = ppv.id
               WHERE papvav."valueId" IN (:...valueIds${ filter.attributeId }))`, { ['valueIds' + filter.attributeId]: filter.values });
			});
		}

		const res = await caQb.getRawMany();
		return res.map(r => ({
			id: Number(r.id),
			priceAmount: r.priceAmount,
			discountedPrice: r.discountedPrice,
		}));
	}

	async findByIdsWithSortingAndPagination(ids: number[], skip?: number, take?: number, sorting?: ProductSorting, language: LanguageCode = LanguageCode.en): Promise<ProductEntity[]> {
		const q = this.createQueryBuilder('p')
					  .select('p.id', 'id');
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
		const res = await q.skip(skip)
						   .take(take)
						   .whereInIds(ids)
						   .getRawMany();
		const pageIds = res.map(r => r.id);
		return await this.createQueryBuilder('p')
						 .leftJoinAndSelect('p.productType', 'pt')
						 .leftJoinAndSelect('p.category', 'c')
						 .leftJoinAndSelect('p.defaultVariant', 'dv')
						 .leftJoinAndSelect('p.attributes', 'att')
						 .leftJoinAndSelect('att.values', 'aval')
						 .leftJoinAndSelect('aval.value', 'avalval')
						 .leftJoinAndSelect('att.productTypeAttribute', 'pta')
						 .leftJoinAndSelect('pta.attribute', 'attr')
						 .leftJoinAndSelect('p.productMedia', 'pmedia')
						 .leftJoinAndSelect('pmedia.media', 'pmediaMedia')
						 .leftJoinAndSelect('p.collections', 'pcollections')
						 .leftJoinAndSelect('pcollections.collection', 'pcollection')
						 .whereInIds(pageIds)
						 .getMany();
	}

	findByCategoryIds(categoryIds: number[]) {
		return this.find({
			relations: ['productMedia'],
			where: {
				category: {
					id: In(categoryIds),
				},
			},
			loadEagerRelations: false,
		});
	}

	async findAllIds() {
		const res = await this.find({
			select: ['id'],
		});
		return res.map(p => p.id);
	}
}

import { LanguageCode } from '@nima/utils';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AttributeValueEntity } from '../../attributes/entities/attribute-value.entity';
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

	async findFilteredProductIds(collectionId?: number, categoryIds?: number[], filters?: ProductQueryFilterDto[], search?: string): Promise<{ id: number, price: number }[]> {
		const caQb = this.createQueryBuilder('p')
						 .select('p.id', 'id')
						 .addSelect('p."minPrice"', 'price')
						 .distinctOn(['p.id'])
						 .where('p.id IS NOT NULL');
		if ( search ) {
			const query = `'"${ search.trim().replace(' ', '+') }":*'`;
			caQb.andWhere(`to_tsvector(pp.searchDocument) @@ to_tsquery(${ query })`);
		}

		if ( categoryIds ) {
			caQb.andWhere('p."categoryId" IN (:...categoryIds)', {
				categoryIds: categoryIds,
			});
		}

		if ( collectionId ) {
			//TODO: Collection Handling
		}

		console.log(filters);

		if ( filters && filters.length > 0 ) {
			caQb.leftJoin(ProductVariantEntity, 'pv', `pv."productId" = p.id`)
				.leftJoin(AssignedProductAttributeEntity, `apa`, `p.id = apa."productId"`);

			filters.forEach((value, index) => {
				console.log(value);
				if ( !value.values || value.values.length === 0 ) return;
				console.log(value.values);
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
		console.log({ res });
		return res.map(r => ({ id: Number(r.id), price: Number(r.price) }));
	}

	async findByIdsWithSorting(ids: number[], skip?: number, take?: number, sorting?: ProductSorting, language: LanguageCode = LanguageCode.en): Promise<ProductEntity[]> {
		const q = this.createQueryBuilder('p')
					  .leftJoinAndSelect('p.productType', 'pt')
					  .leftJoinAndSelect('p.category', 'c')
					  .leftJoinAndSelect('p.attributes', 'att')
					  .leftJoinAndSelect('att.values', 'aval')
					  .leftJoinAndSelect('aval.value', 'avalval')
					  .leftJoinAndSelect('att.productTypeAttribute', 'pta')
					  .leftJoinAndSelect('pta.attribute', 'attr')
					  .leftJoinAndSelect('p.productMedia', 'pmedia')
					  .leftJoinAndSelect('pmedia.media', 'pmediaMedia')
					  .whereInIds(ids)
			// .loadRelationIdAndMap('category', 'p.category')
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

		// console.log('----');
		const res = await q.getMany();
		// console.dir({ res }, { depth: 100 });
		// console.log('-###-');
		return res;
	}
}

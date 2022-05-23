import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DiscountSaleEntity } from '../entities/discount-sale.entity';

@EntityRepository(DiscountSaleEntity)
export class DiscountSaleRepository extends BaseRepository<DiscountSaleEntity> {
	async getFullObject(id: number) {
		return this.findOne({
			where: {
				id: id,
			},
			relations: ['collections', 'products', 'variants', 'categories'],
		});
	}

	async getFullObjects() {
		return this.find({
			relations: ['collections', 'products', 'variants', 'categories'],
		});
	}

	async getAllIds() {
		const res = await this.find({ select: ['id'] });
		return res.map(r => r.id);
	}

	async deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}

	async deleteProduct(productId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_sale_products')
				   .where('"productsProductsId" = :productId', { productId: productId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteVariant(variantId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_sale_variants')
				   .where('"productsProductVariantsId" = :variantId', { productId: variantId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteCategory(categoryId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_sale_categories')
				   .where('"categoriesCategoriesId" = :categoryId', { productId: categoryId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteCollection(collectionId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_sale_collections')
				   .where('"collectionCollectionId" = :collectionId', { productId: collectionId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}
}

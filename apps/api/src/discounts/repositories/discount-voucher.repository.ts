import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DiscountVoucherEntity } from '../entities/discount-voucher.entity';

@EntityRepository(DiscountVoucherEntity)
export class DiscountVoucherRepository extends BaseRepository<DiscountVoucherEntity> {
	async getFullObjects() {
		return this.find({
			relations: ['collections', 'products', 'variants', 'categories'],
		});
	}

	async getFullObject(id: number) {
		return this.findOne({
			where: {
				id: id,
			},
			relations: ['collections', 'products', 'variants', 'categories'],
		});
	}

	async getAllIds() {
		const res = await this.find({ select: ['id'] });
		return res.map(r => r.id);
	}

	async findByCode(code: string) {
		return this.findOne({
			where: {
				code: code,
			},
		});
	}

	async deleteById(id: number) {
		return this.delete({
			id: id,
		});
	}

	async deleteProduct(productId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_voucher_products')
				   .where('"productsProductsId" = :productId', { productId: productId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteVariant(variantId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_voucher_variants')
				   .where('"productsProductVariantsId" = :variantId', { variantId: variantId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteCategory(categoryId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_voucher_categories')
				   .where('"categoriesCategoriesId" = :categoryId', { categoryId: categoryId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}

	async deleteCollection(collectionId: number, saleId: number) {
		return this.createQueryBuilder()
				   .delete()
				   .from('discounts_discount_voucher_collections')
				   .where('"collectionCollectionId" = :collectionId', { collectionId: collectionId })
				   .andWhere('"discountsDiscountSaleId" = :saleId', { saleId: saleId })
				   .execute();
	}
}

import { EntityRepository, Repository } from 'typeorm';
import { ProductVariantEntity } from './product-variant.entity';

@EntityRepository(ProductVariantEntity)
export class ProductVariantRepository extends Repository<ProductVariantEntity> {
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
}

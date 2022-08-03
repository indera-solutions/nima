import { EntityRepository, TreeRepository } from 'typeorm';
import { ProductEntity } from '../../products/entities/product.entity';
import { CategoryEntity } from './category.entity';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends TreeRepository<CategoryEntity> {

	async getBySlug(slug: string): Promise<CategoryEntity> {
		return this.findOne({
			where: {
				slug: slug,
			},
		});
	}

	async listIdsOfChildren(id: number) {
		const root = await this.findOne({ where: { id: id }, select: ['id'] });
		const res = await this.findDescendantsTree(root, { depth: Number.MAX_SAFE_INTEGER, relations: [] });
		return res.children.map(c => c.id);
	}

	async getProductCountOfCategory(id: number): Promise<number> {
		const res = await this.createQueryBuilder('c')
							  .leftJoin(ProductEntity, 'p', 'c.id = p."categoryId"')
							  .where('p."categoryId" = :id', { id: id })
							  .getCount();
		return res;
	}
}

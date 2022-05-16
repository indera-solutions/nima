import { EntityRepository, TreeRepository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';

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
		const root = await this.findOne({ where: { id: id } });
		const res = await this.findDescendantsTree(root, { depth: Number.MAX_SAFE_INTEGER });
		return res.children.map(c => c.id);
	}
}

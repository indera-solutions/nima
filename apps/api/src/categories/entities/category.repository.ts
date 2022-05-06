import { EntityRepository, TreeRepository } from 'typeorm';
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
}

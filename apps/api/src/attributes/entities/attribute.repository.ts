import { EntityRepository, Repository } from 'typeorm';
import { AttributeEntity } from './attribute.entity';

@EntityRepository(AttributeEntity)
export class AttributeRepository extends Repository<AttributeEntity> {
	findBySlug(slug: string): Promise<AttributeEntity> {
		return this.findOne({
			where: {
				slug: slug,
			},
			relations: ['values'],
		});
	}

	findById(id: number): Promise<AttributeEntity> {
		return this.findOne({ where: { id: id } });
	}

	async deleteById(id: number) {
		return this.delete(id);
	}
}

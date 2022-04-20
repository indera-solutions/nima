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
}

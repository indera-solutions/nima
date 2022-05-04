import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AssignedProductAttributeEntity } from './product-attribute-assignment.entity';

@EntityRepository(AssignedProductAttributeEntity)
export class AssignedProductAttributeRepository extends BaseRepository<AssignedProductAttributeEntity> {

	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id,
			},
		});
	}
}

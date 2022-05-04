import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { AssignedProductAttributeValueEntity } from './product-attribute-value-assignment.entity';

@EntityRepository(AssignedProductAttributeValueEntity)
export class AssignedProductAttributeValueRepository extends BaseRepository<AssignedProductAttributeValueEntity> {

}

import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductMediaEntity } from './product-media.entity';

@EntityRepository(ProductMediaEntity)
export class ProductMediaRepository extends BaseRepository<ProductMediaEntity> {

}

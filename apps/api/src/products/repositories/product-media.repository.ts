import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductMediaEntity } from '../entities/product-media.entity';

@EntityRepository(ProductMediaEntity)
export class ProductMediaRepository extends BaseRepository<ProductMediaEntity> {

}

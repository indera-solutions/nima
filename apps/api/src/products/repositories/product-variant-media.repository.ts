import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ProductVariantMediaEntity } from '../entities/product-variant-media.entity';

@EntityRepository(ProductVariantMediaEntity)
export class ProductVariantMediaRepository extends BaseRepository<ProductVariantMediaEntity> {

}

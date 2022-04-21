import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeVariantAttributeEntity } from '../entities';

@EntityRepository(ProductTypeVariantAttributeEntity)
export class ProductTypeVariantAttributeRepository extends Repository<ProductTypeVariantAttributeEntity> {

}

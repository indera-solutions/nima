import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeAttributeEntity } from '../entities';

@EntityRepository(ProductTypeAttributeEntity)
export class ProductTypeAttributeRepository extends Repository<ProductTypeAttributeEntity> {

}

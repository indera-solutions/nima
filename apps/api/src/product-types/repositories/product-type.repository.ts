import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeEntity } from '../entities';

@EntityRepository(ProductTypeEntity)
export class ProductTypeRepository extends Repository<ProductTypeEntity> {

}

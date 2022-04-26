import { EntityRepository, Repository } from 'typeorm';
import { AttributeValueEntity } from './attribute-value.entity';

@EntityRepository(AttributeValueEntity)
export class AttributeValuesRepository extends Repository<AttributeValueEntity> {

	async getOfAttribute(attributeId: number) {
		return this.find({ where: { attribute: { id: attributeId } } });
	}

	async deleteById(id: number) {
		return this.delete(id);
	}
}

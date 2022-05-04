import { CreateAssignedProductAttributeValueDto } from './dto/product-attribute-value-assignment.dto';
import { AssignedProductAttributeValueEntity } from './entities/product-attribute-value-assignment.entity';
import { AssignedProductAttributeValueRepository } from './entities/product-attribute-value-assignment.repository';

export class ProductAttributeValueAssignmentService {
	constructor(
		private assignedProductAttributeValueRepository: AssignedProductAttributeValueRepository,
	) {
	}

	save(params: { dto: CreateAssignedProductAttributeValueDto }): AssignedProductAttributeValueEntity
	save(params: { dto: CreateAssignedProductAttributeValueDto, id: number }): AssignedProductAttributeValueEntity
	async save(params: { dto: CreateAssignedProductAttributeValueDto, id?: number }): AssignedProductAttributeValueEntity {
		const { id, dto } = params;
	}
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssignedProductAttributeDto } from './dto/product-attribute-assignment.dto';
import { CreateAssignedProductAttributeValueDto } from './dto/product-attribute-value-assignment.dto';
import { AssignedProductAttributeEntity } from './entities/product-attribute-assignment.entity';
import { AssignedProductAttributeRepository } from './entities/product-attribute-assignment.repository';
import { AssignedProductAttributeValueEntity } from './entities/product-attribute-value-assignment.entity';

@Injectable()
export class ProductAttributeAssignmentService {
	constructor(
		private assignedProductAttributeRepository: AssignedProductAttributeRepository,
	) {
	}

	async save(params: { dto: CreateAssignedProductAttributeDto, id?: number }): AssignedProductAttributeEntity {
		const { id, dto } = params;
		let assignmentId = undefined;
		let oldAssignment: AssignedProductAttributeEntity = undefined;
		if ( id ) {
			assignmentId = Number(id);
			oldAssignment = await this.assignedProductAttributeRepository.findById(assignmentId);
		}
		return;
	}

	async getById(params: { id: number }): Promise<AssignedProductAttributeEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		const res = await this.assignedProductAttributeRepository.findById(id);
		if ( !res ) throw new NotFoundException('ASSIGNMENT_NOT_FOUND');
		return res;
	}

	private async syncValues(params: { oldValues: AssignedProductAttributeValueEntity[], newValues: CreateAssignedProductAttributeValueDto[], assignmentId: number }) {
		const { oldValues, newValues, assignmentId } = params;
		const oldIds = oldValues.map(value => value.value.id);
		const newIds = newValues.map(value => value.valueId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newValues.filter(att => !oldIds.includes(att.valueId));
		const existing = oldValues.filter(att => newIds.includes(att.value.id));
		const toUpdate = existing.filter(att => {
			const nv = newValues.find(nAtt => nAtt.valueId === att.value.id);
			return att.sortOrder !== nv.sortOrder;
		});
		const promises: Promise<any>[] = [];

		for ( const toDeleteElement of toDelete ) {
			promises.push(this.simpleAttributeService.deleteProductTypeAttribute({ productTypeId: ptId, attributeId: toDeleteElement }));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.simpleAttributeService.save({ productTypeId: ptId, dto: createProductTypeAttributeDto }));
		}
		for ( const productTypeAttributeEntity of toUpdate ) {
			const newAttr = newAttributes.find(attr => attr.attributeId = productTypeAttributeEntity.attribute.id);
			promises.push(this.simpleAttributeService.patch({ productTypeId: ptId, dto: { sortOrder: newAttr.sortOrder }, productTypeAttributeId: productTypeAttributeEntity.id }));
		}
		await Promise.all(promises);
	}
}

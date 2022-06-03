import { Injectable, NotFoundException } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima-cms/utils';
import { CreateAttributeValueDto, UpdateAttributeValueDto } from './dto/attribute-value.dto';
import { AttributeValueEntity } from './entities/attribute-value.entity';
import { AttributeValuesRepository } from './entities/attribute-values.repository';
import { AttributeRepository } from './entities/attribute.repository';

@Injectable()
export class AttributeValuesService {
	constructor(
		private attributeValueRepository: AttributeValuesRepository,
		private attributeRepository: AttributeRepository,
	) {
	}

	save(params: { attributeId: number, dto: CreateAttributeValueDto }): Promise<AttributeValueEntity>
	save(params: { attributeId: number, dto: CreateAttributeValueDto, valueId: number }): Promise<AttributeValueEntity>
	async save(params: { attributeId: number, dto: CreateAttributeValueDto, valueId?: number }): Promise<AttributeValueEntity> {
		const { dto, valueId, attributeId } = params;
		const attribute = await this.attributeRepository.findById(attributeId);
		if ( !dto.slug ) {
			const temp = dto.name['en'] || dto.name['el'];
			if ( !temp ) throw new Error('no name for slug');
			dto.slug = getSlug(temp);
		}
		return this.attributeValueRepository.save({ ...dto, id: valueId, attribute: attribute });
	}

	async list(params?: EmptyObject): Promise<AttributeValueEntity[]> {
		return this.attributeValueRepository.find();
	}

	async getById(params: { id: number }): Promise<AttributeValueEntity> {
		const { id } = params;
		const res = await this.attributeValueRepository.findOne(id);
		if ( !res ) throw new NotFoundException('ATTRIBUTE_VALUE_NOT_FOUND');
		return res;
	}

	async getOfAttribute(params: { attributeId: number }): Promise<AttributeValueEntity[]> {
		const { attributeId } = params;
		return this.attributeValueRepository.getOfAttribute(attributeId);
	}

	async update(params: { attributeId: number, dto: UpdateAttributeValueDto, valueId: number }): Promise<AttributeValueEntity> {
		const { valueId, dto, attributeId } = params;
		const value = await this.getById({ id: valueId });
		for ( const dtoKey in dto ) {
			value[dtoKey] = dto[dtoKey];
		}
		return this.save({ dto: value, valueId: valueId, attributeId: attributeId });
	}

	async deleteById(params: { id: number }): Promise<AttributeValueEntity> {
		const { id } = params;
		const attrVal = await this.getById({ id });
		await this.attributeValueRepository.deleteById(id);
		return attrVal;
	}

	async attributeDrillDown(params: { ids: number[] }) {
		return await this.attributeValueRepository.attributeDrillDown(params.ids);
	}

	async getSlugAndAttributeSlugOfValues(ids: number[]) {
		return this.attributeValueRepository.getSlugAndAttributeSlugOfValues(ids);
	}
}

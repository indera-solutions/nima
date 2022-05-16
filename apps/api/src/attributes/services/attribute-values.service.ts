import { Injectable, NotFoundException } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima-cms/utils';
import { AttributeValueDto, CreateAttributeValueDto, UpdateAttributeValueDto } from '../dto/attribute-value.dto';
import { AttributeValueEntity } from '../entities/attribute-value.entity';
import { AttributeValuesRepository } from '../repositories/attribute-values.repository';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributeValuesService {
	constructor(
		private attributeValueRepository: AttributeValuesRepository,
		private attributeRepository: AttributeRepository,
	) {
	}

	async create(params: { attributeId: number, dto: CreateAttributeValueDto, valueId?: number }): Promise<AttributeValueEntity> {
		const { dto, valueId, attributeId } = params;
		const attribute = await this.attributeRepository.findById(attributeId);
		if ( !dto.slug ) {
			const temp = dto.name['en'] || dto.name['el'];
			if ( !temp ) throw new Error('no name for slug');
			dto.slug = getSlug(temp);
		}
		return await this.attributeValueRepository.save({ ...dto, id: valueId, attribute: attribute });
	}

	async list(params?: EmptyObject): Promise<AttributeValueEntity[]> {
		return await this.attributeValueRepository.find();

	}

	async findById(params: { id: number }): Promise<AttributeValueEntity> {
		const { id } = params;
		return await this.attributeValueRepository.findOne(id);
	}

	async getOfAttribute(params: { attributeId: number }): Promise<AttributeValueEntity[]> {
		const { attributeId } = params;
		return await this.attributeValueRepository.getOfAttribute(attributeId);
	}

	async patch(params: { attributeId: number, dto: UpdateAttributeValueDto, valueId: number }): Promise<AttributeValueEntity> {
		const { valueId, dto, attributeId } = params;
		const value = await this.findById({ id: valueId });
		if ( !value ) throw new NotFoundException('VALUE_NOT_FOUND');
		for ( const dtoKey in dto ) {
			value[dtoKey] = dto[dtoKey];
		}
		return await this.attributeValueRepository.save({ ...value, valueId: valueId, attributeId: attributeId });
	}

	async update(params: { attributeId: number, dto: CreateAttributeValueDto, valueId?: number }): Promise<AttributeValueEntity> {
		const { dto, valueId, attributeId } = params;
		const attribute = await this.attributeRepository.findById(attributeId);
		return await this.attributeValueRepository.save({ ...dto, id: valueId, attribute: attribute });
	}

	async deleteById(params: { id: number }): Promise<AttributeValueEntity> {
		const { id } = params;
		const attrVal = await this.findById({ id });
		await this.attributeValueRepository.deleteById(id);
		return attrVal;
	}

	async attributeDrillDown(params: { ids: number[] }) {
		return await this.attributeValueRepository.attributeDrillDown(params.ids);
	}

	async getSlugAndAttributeSlugOfValues(ids: number[]) {
		return this.attributeValueRepository.getSlugAndAttributeSlugOfValues(ids);
	}

	async getDtos(ids?: number[]): Promise<AttributeValueDto[]> {
		const attributes = ids ? await this.attributeValueRepository.findByIds(ids) : await this.attributeValueRepository.find();
		return attributes.map(attributeValue => this.parseDto(attributeValue));
	}

	async getDto(id: number): Promise<AttributeValueDto> {
		const dtos = await this.getDtos([id]);
		if ( !dtos[0] ) throw new NotFoundException('ATTRIBUTE_VALUE_NOT_FOUND');
		return dtos[0];
	}

	parseDto(entity: AttributeValueEntity): AttributeValueDto {
		return {
			id: entity.id,
			sortOrder: entity.sortOrder,
			boolean: entity.boolean,
			value: entity.value,
			name: entity.name,
			slug: entity.slug,
			dateTime: entity.dateTime,
			fileUrl: entity.fileUrl,
			richText: entity.richText,
		};
	}
}

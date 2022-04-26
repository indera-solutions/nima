import { Injectable, NotFoundException } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima/utils';
import { AttributeValueDto, CreateAttributeValueDto } from './dto/attribute-value.dto';
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

	private static prepareAttributeValue(av: AttributeValueEntity): AttributeValueDto {
		return {
			id: av.id,
			name: av.name,
			slug: av.slug,
			value: av.value,
			boolean: av.boolean,
			dateTime: av.dateTime,
			fileUrl: av.fileUrl,
			richText: av.richText,
			sortOrder: av.sortOrder,
			attribute: av.attribute,
		};
	}

	save(params: { dto: CreateAttributeValueDto }): Promise<AttributeValueDto>
	save(params: { dto: CreateAttributeValueDto, id: number }): Promise<AttributeValueDto>
	async save(params: { dto: CreateAttributeValueDto, id?: number }): Promise<AttributeValueDto> {
		const { dto, id } = params;
		const attribute = await this.attributeRepository.findById(dto.attributeId);
		if ( !dto.slug ) {
			const temp = dto.name['en'] || dto.name['el'];
			if ( !temp ) throw new Error('no name for slug');
			console.log(temp);
			dto.slug = getSlug(temp);
		}
		const res = await this.attributeValueRepository.save({ ...dto, id: id, attribute: attribute });
		return AttributeValuesService.prepareAttributeValue(res);
	}

	async list(params?: EmptyObject): Promise<AttributeValueDto[]> {
		const res = await this.attributeValueRepository.find();
		return res.map(av => AttributeValuesService.prepareAttributeValue(av));
	}

	async getById(params: { id: number }): Promise<AttributeValueDto> {
		const { id } = params;
		const res = await this.attributeValueRepository.findOne(id);
		if ( !res ) throw new NotFoundException('ATTRIBUTE_VALUE_NOT_FOUND');
		return AttributeValuesService.prepareAttributeValue(res);
	}

	async getOfAttribute(params: { attributeId: number }): Promise<AttributeValueDto[]> {
		const { attributeId } = params;
		return await this.attributeValueRepository.getOfAttribute(attributeId);
	}

	async deleteById(params: { id: number }): Promise<AttributeValueDto> {
		const { id } = params;
		const attrVal = await this.getById({ id });
		await this.attributeValueRepository.deleteById(id);
		return attrVal;
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
import { CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeRepository } from './entities/attribute.repository';

@Injectable()
export class AttributesService {
	constructor(private attributeEntityRepository: AttributeRepository) {
	}

	async findBySlug(slug: string): Promise<AttributeEntity> {
		return this.attributeEntityRepository.findBySlug(slug);
	}

	save(params: { dto: CreateAttributeDto }): Promise<AttributeEntity>
	save(params: { dto: CreateAttributeDto, id: number }): Promise<AttributeEntity>
	async save(params: { dto: CreateAttributeDto, id?: number }): Promise<AttributeEntity> {
		const { dto, id } = params;
		if ( !dto.slug ) {
			dto.slug = getSlug(dto.name.en || dto.name.el || '');
		}
		return this.attributeEntityRepository.save({ ...dto, id: id });
	}

	async getById(params: { id: number }): Promise<AttributeEntity> {
		const { id } = params;
		const attribute = await this.attributeEntityRepository.findById(id);
		if ( !attribute ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return attribute;
	}

	async findAll(): Promise<AttributeEntity[]> {
		return this.attributeEntityRepository.find();
	}

	async deleteById(params: { id: number }): Promise<AttributeEntity> {
		const { id } = params;
		const attr = await this.getById({ id });
		await this.attributeEntityRepository.deleteById(id);
		return attr;
	}

	async update(params: { id: number; dto: UpdateAttributeDto }): Promise<AttributeEntity> {
		const { id, dto } = params;
		const attr = await this.getById({ id: id });
		for ( const dtoKey in dto ) {
			attr[dtoKey] = dto[dtoKey];
		}
		return await this.save({ dto: attr, id: id });
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dto/attribute.dto';
import { AttributeEntity } from '../entities/attribute.entity';
import { AttributeRepository } from '../repositories/attribute.repository';

@Injectable()
export class AttributesService {
	constructor(private attributeEntityRepository: AttributeRepository) {
	}

	async findBySlug(slug: string): Promise<AttributeEntity> {
		return this.attributeEntityRepository.findBySlug(slug);
	}

	async save(params: { dto: CreateAttributeDto }): Promise<AttributeEntity> {
		const { dto } = params;
		const attribute = await this.attributeEntityRepository.save({ ...dto });
		return attribute;
	}

	async getById(params: { id: number }): Promise<AttributeEntity> {
		const { id } = params;
		const attribute = await this.attributeEntityRepository.findById(id);
		if ( !attribute ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return attribute;
	}

	async findAll(): Promise<AttributeEntity[]> {
		const attributes = await this.attributeEntityRepository.find();
		return attributes;
	}

	async deleteById(params: { id: number }): Promise<AttributeEntity> {
		const { id } = params;
		const attr = await this.getById({ id });
		await this.attributeEntityRepository.deleteById(id);
		return attr;
	}

	async patch(params: { id: number; dto: UpdateAttributeDto }): Promise<AttributeEntity> {
		const { id, dto } = params;
		const attr = await this.getById({ id: id });
		for ( const dtoKey in dto ) {
			attr[dtoKey] = dto[dtoKey];
		}
		return await this.attributeEntityRepository.save({ dto: attr, id: id });
	}

	async update(params: { id: number; dto: UpdateAttributeDto }): Promise<AttributeEntity> {
		const { dto, id } = params;
		const attribute = await this.attributeEntityRepository.save({ ...dto, id: id });
		return attribute;
	}

	async getDtos(ids?: number[]): Promise<AttributeDto[]> {
		const attributes = ids ? await this.attributeEntityRepository.findByIds(ids) : await this.attributeEntityRepository.find();
		return attributes.map(attribute => ({
			id: attribute.id,
			filterableInDashboard: attribute.filterableInDashboard,
			filterableInStorefront: attribute.filterableInStorefront,
			inputType: attribute.inputType,
			storefrontSearchPosition: attribute.storefrontSearchPosition,
			valueRequired: attribute.valueRequired,
			visibleInStorefront: attribute.visibleInStorefront,
			availableInGrid: attribute.availableInGrid,
			name: attribute.name,
			metadata: attribute.metadata,
			privateMetadata: attribute.privateMetadata,
			unit: attribute.unit,
			slug: attribute.slug,
		}));
	}

	async getDto(id: number): Promise<AttributeDto> {
		const dtos = await this.getDtos([id]);
		if ( !dtos[0] ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return dtos[0];
	}
}

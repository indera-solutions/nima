import { Injectable, NotFoundException } from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeRepository } from './entities/attribute.repository';

@Injectable()
export class AttributesService {
	constructor(private attributeEntityRepository: AttributeRepository) {
	}

	private static preparePublicAttribute(attribute: AttributeEntity): AttributeDto {
		return {
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
			privateMetadata: {},
			slug: attribute.slug,
			unit: attribute.unit,
		};
	}

	private static prepareAdminAttribute(attribute: AttributeEntity): AttributeDto {
		return {
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
		};
	}

	async findBySlug(slug: string): Promise<AttributeEntity> {
		return this.attributeEntityRepository.findBySlug(slug);
	}

	save(params: { dto: CreateAttributeDto }): Promise<AttributeDto>

	save(params: { dto: CreateAttributeDto, id: number }): Promise<AttributeDto>

	async save(params: { dto: CreateAttributeDto, id?: number }): Promise<AttributeDto> {
		const { dto, id } = params;
		if ( !dto.slug ) {
			dto.slug = getSlug(dto.name.en || dto.name.el || '');
		}
		const attribute = await this.attributeEntityRepository.save({ ...dto, id: id });
		return AttributesService.prepareAdminAttribute(attribute);
	}

	async getById(params: { id: number }): Promise<AttributeDto> {
		const { id } = params;
		const attribute = await this.attributeEntityRepository.findById(id);
		if ( !attribute ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return AttributesService.preparePublicAttribute(attribute);
	}

	async findAll(): Promise<AttributeDto[]> {
		const attributes = await this.attributeEntityRepository.find();
		return attributes.map(attribute => AttributesService.preparePublicAttribute(attribute));
	}

	async deleteById(params: { id: number }): Promise<AttributeDto> {
		const { id } = params;
		const attr = await this.getById({ id });
		await this.attributeEntityRepository.deleteById(id);
		return attr;
	}

	async update(params: { id: number; dto: UpdateAttributeDto }) {
		const { id, dto } = params;
		const attr = await this.getById({ id: id });
		for ( const dtoKey in dto ) {
			attr[dtoKey] = dto[dtoKey];
		}
		return await this.save({ dto: attr, id: id });
	}
}

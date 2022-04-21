import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminAttributeDto, CreateAttributeDto, PublicAttributeDto } from './dto/attribute.dto';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeRepository } from './entities/attribute.repository';

@Injectable()
export class AttributesService {
	constructor(private attributeEntityRepository: AttributeRepository) {
	}

	async findBySlug(slug: string): Promise<AttributeEntity> {
		return this.attributeEntityRepository.findBySlug(slug);
	}

	save(params: { dto: CreateAttributeDto }): Promise<AdminAttributeDto>
	save(params: { dto: CreateAttributeDto, id: number }): Promise<AdminAttributeDto>
	async save(params: { dto: CreateAttributeDto, id?: number }): Promise<AdminAttributeDto> {
		const { dto, id } = params;
		const attribute = await this.attributeEntityRepository.save({ ...dto, id: id });
		return AttributesService.prepareAdminAttribute(attribute);
	}

	async getById(params: { id: number }): Promise<PublicAttributeDto> {
		const { id } = params;
		const attribute = await this.attributeEntityRepository.findById(id);
		if ( !attribute ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return AttributesService.preparePublicAttribute(attribute);
	}

	async findAll(): Promise<PublicAttributeDto[]> {
		const attributes = await this.attributeEntityRepository.find();
		return attributes.map(attribute => AttributesService.preparePublicAttribute(attribute));
	}

	async deleteById(params: { id: number }): Promise<PublicAttributeDto> {
		const { id } = params;
		const attr = await this.getById({ id });
		await this.attributeEntityRepository.deleteById(id);
		return attr;
	}

	private static preparePublicAttribute(attribute: AttributeEntity): PublicAttributeDto {
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
			slug: attribute.slug,
			unit: attribute.unit,
		};
	}

	private static prepareAdminAttribute(attribute: AttributeEntity): AdminAttributeDto {
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
}

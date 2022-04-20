import { Injectable } from '@nestjs/common';
import { AttributeEntity } from './models/attribute.entity';
import { AttributeRepository } from './models/attribute.repository';

@Injectable()
export class AttributesService {
	constructor(private attributeEntityRepository: AttributeRepository) {
	}

	async findAll(): Promise<AttributeEntity[]> {
		return this.attributeEntityRepository.find();
	}

	async findBySlug(slug: string): Promise<AttributeEntity> {
		return this.attributeEntityRepository.findBySlug(slug);
	}
}

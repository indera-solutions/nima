import { Controller, Get } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributeEntity } from './models/attribute.entity';

@Controller('attributes')
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Get()
	findAll(): Promise<AttributeEntity[]> {
		return this.service.findAll();
	}

	@Get('/slug')
	findBySlug(): Promise<AttributeEntity> {
		return this.service.findBySlug('testattr');
	}
}

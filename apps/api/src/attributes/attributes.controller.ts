import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';
import { AttributeEntity } from './models/attribute.entity';

@Controller('attributes')
@ApiTags('Attributes')
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

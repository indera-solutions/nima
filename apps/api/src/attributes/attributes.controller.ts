import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';
import { AttributeDto, CreateAttributeDto } from './dto/attribute.dto';

@Controller('attributes')
@ApiTags('Attributes')
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Get()
	@ApiResponse({ type: [AttributeDto] })
	findAll(): Promise<AttributeDto[]> {
		return this.service.findAll();
	}

	@Post()
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	save(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ dto: createAttributeDto });
	}
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';
import { AdminAttributeDto, CreateAttributeDto, PublicAttributeDto } from './dto/attribute.dto';

@Controller('attributes')
@ApiTags('Attributes')
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Get()
	@ApiResponse({ type: [PublicAttributeDto] })
	findAll(): Promise<PublicAttributeDto[]> {
		return this.service.findAll();
	}

	@Post()
	@ApiResponse({ type: AdminAttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	save(@Body() createAttributeDto: CreateAttributeDto): Promise<AdminAttributeDto> {
		return this.service.save({ dto: createAttributeDto });
	}
}

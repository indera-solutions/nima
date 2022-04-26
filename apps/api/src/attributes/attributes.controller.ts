import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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

	@Get('/:attributeId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiResponse({ type: AttributeDto })
	getById(@Param('attributeId') attributeId: number): Promise<AttributeDto> {
		return this.service.getById({ id: attributeId });
	}

	@Get('/:attributeId/values')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiResponse({ type: AttributeDto })
	getValuesOfAttributeById(@Param('attributeId') attributeId: number): Promise<AttributeDto> {
		return this.service.getById({ id: attributeId });
	}

	@Post()
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	save(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ dto: createAttributeDto });
	}
}

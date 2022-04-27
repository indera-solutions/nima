import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributesService } from './attributes.service';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';

@Controller('attributes')
@ApiTags('Attributes')
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Post()
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	save(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ dto: createAttributeDto });
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
	getById(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeDto> {
		return this.service.getById({ id: attributeId });
	}

	@Patch('/:attributeId')
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	patchAttribute(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() updateAttributeDto: UpdateAttributeDto): Promise<AttributeDto> {
		return this.service.update({ id: attributeId, dto: updateAttributeDto });
	}

	@Put('/:attributeId')
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	updateAttribute(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ id: attributeId, dto: createAttributeDto });
	}

	@Delete('/:attributeId')
	@ApiResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	deleteAttribute(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeDto> {
		return this.service.deleteById({ id: attributeId });
	}
}

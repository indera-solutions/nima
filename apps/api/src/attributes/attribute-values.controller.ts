import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValueDto, CreateAttributeValueDto, UpdateAttributeValueDto } from './dto/attribute-value.dto';

@Controller('attributes/:attributeId/values')
@ApiTags('Attribute Values')
export class AttributeValuesController {
	constructor(private readonly service: AttributeValuesService) {
	}

	@Post()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiResponse({ type: AttributeValueDto })
	@ApiBody({ type: CreateAttributeValueDto })
	save(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() createAttributeDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.save({ attributeId: attributeId, dto: createAttributeDto });
	}

	@Get()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiResponse({ type: [AttributeValueDto] })
	getValuesOfAttributeById(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeValueDto[]> {
		return this.service.getOfAttribute({ attributeId: attributeId });
	}

	@Get('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiResponse({ type: AttributeValueDto })
	getValueById(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number): Promise<AttributeValueDto> {
		return this.service.getById({ id: valueId });
	}

	@Patch('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiResponse({ type: AttributeValueDto })
	patchValue(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number, @Body() updateAttributeValueDto: UpdateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.update({ valueId: valueId, dto: updateAttributeValueDto, attributeId: attributeId });
	}

	@Put('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiResponse({ type: AttributeValueDto })
	updateValue(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number, @Body() createAttributeValueDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.save({ attributeId: valueId, dto: createAttributeValueDto });
	}

	@Delete('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiResponse({ type: AttributeValueDto })
	deleteValueByID(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number): Promise<AttributeValueDto> {
		return this.service.deleteById({ id: valueId });
	}
}

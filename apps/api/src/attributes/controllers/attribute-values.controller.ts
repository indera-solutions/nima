import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AttributeValueDto, CreateAttributeValueDto, UpdateAttributeValueDto } from '../dto/attribute-value.dto';
import { AttributeValuesService } from '../services/attribute-values.service';

@Controller('attributes/:attributeId/values')
@ApiTags('Attribute Values')

export class AttributeValuesController {
	constructor(private readonly service: AttributeValuesService) {
	}

	@Post()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiOkResponse({ type: AttributeValueDto })
	@ApiBody({ type: CreateAttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	save(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() createAttributeDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.save({ attributeId: attributeId, dto: createAttributeDto });
	}

	@Get()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiOkResponse({ type: [AttributeValueDto] })
	getValuesOfAttributeById(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeValueDto[]> {
		return this.service.getOfAttribute({ attributeId: attributeId });
	}

	@Get('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	getValueById(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number): Promise<AttributeValueDto> {
		return this.service.getById({ id: valueId });
	}

	@Patch('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	patchValue(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number, @Body() updateAttributeValueDto: UpdateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.update({ valueId: valueId, dto: updateAttributeValueDto, attributeId: attributeId });
	}

	@Put('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	updateValue(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number, @Body() createAttributeValueDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		return this.service.save({ attributeId: valueId, dto: createAttributeValueDto });
	}

	@Delete('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	deleteValueByID(@Param('attributeId', ParseIntPipe) attributeId: number, @Param('valueId', ParseIntPipe) valueId: number): Promise<AttributeValueDto> {
		return this.service.deleteById({ id: valueId });
	}
}

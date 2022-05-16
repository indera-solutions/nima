import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
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
	async create(@Param('attributeId') attributeId: number, @Body() createAttributeDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		const res = await this.service.create({ attributeId: attributeId, dto: createAttributeDto });
		return await this.service.getDto(res.id);
	}

	@Get()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiOkResponse({ type: [AttributeValueDto] })
	async findByAttributeId(@Param('attributeId') attributeId: number): Promise<AttributeValueDto[]> {
		const res = await this.service.getOfAttribute({ attributeId: attributeId });
		return res.map(r => this.service.parseDto(r));
	}

	@Get('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	async getById(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number): Promise<AttributeValueDto> {
		return await this.service.getDto(valueId);
	}

	@Patch('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async patch(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @Body() updateAttributeValueDto: UpdateAttributeValueDto): Promise<AttributeValueDto> {
		await this.service.patch({ valueId: valueId, dto: updateAttributeValueDto, attributeId: attributeId });
		return await this.service.getDto(valueId);

	}

	@Put('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async update(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @Body() createAttributeValueDto: CreateAttributeValueDto): Promise<AttributeValueDto> {
		await this.service.update({ attributeId: valueId, dto: createAttributeValueDto });
		return await this.service.getDto(valueId);
	}

	@Delete('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiOkResponse({ type: AttributeValueDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number): Promise<AttributeValueDto> {
		const dto = await this.service.getDto(valueId);
		await this.service.deleteById({ id: valueId });
		return dto;
	}
}

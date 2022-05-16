import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dto/attribute.dto';
import { AttributesService } from '../services/attributes.service';

@Controller('attributes')
@ApiTags('Attributes')
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Post()
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		const res = await this.service.save({ dto: createAttributeDto });
		return await this.service.getDto(res.id);
	}

	@Get()
	@ApiOkResponse({ type: [AttributeDto] })
	async findAll(): Promise<AttributeDto[]> {
		return await this.service.getDtos(undefined);
	}

	@Get('/:attributeId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeDto })
	async getById(@Param('attributeId') attributeId: number): Promise<AttributeDto> {
		return await this.service.getDto(attributeId);
	}

	@Patch('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async patch(@Param('attributeId') attributeId: number, @Body() updateAttributeDto: UpdateAttributeDto): Promise<AttributeDto> {
		await this.service.patch({ id: attributeId, dto: updateAttributeDto });
		return await this.service.getDto(attributeId);

	}

	@Put('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async update(@Param('attributeId') attributeId: number, @Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		await this.service.update({ id: attributeId, dto: createAttributeDto });
		return await this.service.getDto(attributeId);
	}

	@Delete('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('attributeId') attributeId: number): Promise<AttributeDto> {
		const dto = await this.service.getDto(attributeId);
		await this.service.deleteById({ id: attributeId });
		return dto;
	}
}

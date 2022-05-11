import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AttributesService } from './attributes.service';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';

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
	create(@Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ dto: createAttributeDto });
	}

	@Get()
	@ApiOkResponse({ type: [AttributeDto] })
	findAll(): Promise<AttributeDto[]> {
		return this.service.findAll();
	}

	@Get('/:attributeId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeDto })
	getById(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeDto> {
		return this.service.getById({ id: attributeId });
	}

	@Patch('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	patch(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() updateAttributeDto: UpdateAttributeDto): Promise<AttributeDto> {
		return this.service.update({ id: attributeId, dto: updateAttributeDto });
	}

	@Put('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	update(@Param('attributeId', ParseIntPipe) attributeId: number, @Body() createAttributeDto: CreateAttributeDto): Promise<AttributeDto> {
		return this.service.save({ id: attributeId, dto: createAttributeDto });
	}

	@Delete('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	remove(@Param('attributeId', ParseIntPipe) attributeId: number): Promise<AttributeDto> {
		return this.service.deleteById({ id: attributeId });
	}
}

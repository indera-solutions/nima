import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AttributeValuesService } from './attribute-values.service';
import { AttributeValueDto, CreateAttributeValueDto, UpdateAttributeValueDto } from './dto/attribute-value.dto';

@Controller('attributes/:attributeId/values')
@ApiTags('Attribute Values')
@ApiBearerAuth()
export class AttributeValuesController {
	constructor(private readonly service: AttributeValuesService) {
	}

	@Post()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiOkResponse({ type: AttributeValueDto })
	@ApiBody({ type: CreateAttributeValueDto })
	@IsStaff()
	async save(@Param('attributeId') attributeId: number, @Body() createAttributeDto: CreateAttributeValueDto, @User() user?: UserEntity): Promise<AttributeValueDto> {
		const res = await this.service.save({ attributeId: attributeId, dto: createAttributeDto });
		return AttributeValueDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Get()
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiOkResponse({ type: [AttributeValueDto] })
	@IsPublic()
	async getValuesOfAttributeById(@Param('attributeId') attributeId: number, @User() user?: UserEntity): Promise<AttributeValueDto[]> {
		const res = await this.service.getOfAttribute({ attributeId: attributeId });
		return res.map(av => AttributeValueDto.prepare(av, { isAdmin: user?.isStaff || false }));
	}

	@Get('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@IsPublic()
	async getValueById(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @User() user?: UserEntity): Promise<AttributeValueDto> {
		const res = await this.service.getById({ id: valueId });
		return AttributeValueDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Patch('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@IsStaff()
	async patchValue(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @Body() updateAttributeValueDto: UpdateAttributeValueDto, @User() user?: UserEntity): Promise<AttributeValueDto> {
		const res = await this.service.update({ valueId: valueId, dto: updateAttributeValueDto, attributeId: attributeId });
		return AttributeValueDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Put('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_VALUE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeValueDto })
	@IsStaff()
	async updateValue(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @Body() createAttributeValueDto: CreateAttributeValueDto, @User() user?: UserEntity): Promise<AttributeValueDto> {
		const res = await this.service.save({ attributeId: valueId, dto: createAttributeValueDto });
		return AttributeValueDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Delete('/:valueId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiParam({ type: Number, name: 'valueId' })
	@ApiOkResponse({ type: AttributeValueDto })
	@IsStaff()
	async deleteValueByID(@Param('attributeId') attributeId: number, @Param('valueId') valueId: number, @User() user?: UserEntity): Promise<AttributeValueDto> {
		const res = await this.service.deleteById({ id: valueId });
		return AttributeValueDto.prepare(res, { isAdmin: user?.isStaff || false });
	}
}

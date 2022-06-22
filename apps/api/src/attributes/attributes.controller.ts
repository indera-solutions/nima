import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AttributesService } from './attributes.service';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from './dto/attribute.dto';

@Controller('attributes')
@ApiTags('Attributes')
@ApiBearerAuth()
export class AttributesController {
	constructor(private service: AttributesService) {
	}

	@Post()
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@IsStaff()
	async create(@Body() createAttributeDto: CreateAttributeDto, @User() user?: UserEntity): Promise<AttributeDto> {
		const res = await this.service.save({ dto: createAttributeDto });
		return AttributeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Get()
	@ApiOkResponse({ type: [AttributeDto] })
	@IsPublic()
	async findAll(@User() user: UserEntity): Promise<AttributeDto[]> {
		const res = await this.service.findAll();
		return res.map(att => AttributeDto.prepare(att, { isAdmin: user?.isStaff || false }));
	}

	@Get('/:attributeId')
	@ApiParam({ type: Number, name: 'attributeId' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiOkResponse({ type: AttributeDto })
	@IsPublic()
	async getById(@Param('attributeId') attributeId: number, @User() user?: UserEntity): Promise<AttributeDto> {
		const res = await this.service.getById({ id: attributeId });
		return AttributeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Patch('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: UpdateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@IsStaff()
	async patch(@Param('attributeId') attributeId: number, @Body() updateAttributeDto: UpdateAttributeDto, @User() user?: UserEntity): Promise<AttributeDto> {
		const res = await this.service.update({ id: attributeId, dto: updateAttributeDto });
		return AttributeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Put('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiBody({ type: CreateAttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@IsStaff()
	async update(@Param('attributeId') attributeId: number, @Body() createAttributeDto: CreateAttributeDto, @User() user?: UserEntity): Promise<AttributeDto> {
		const res = await this.service.save({ id: attributeId, dto: createAttributeDto });
		return AttributeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Delete('/:attributeId')
	@ApiOkResponse({ type: AttributeDto })
	@ApiParam({ type: Number, name: 'attributeId' })
	@IsStaff()
	async remove(@Param('attributeId') attributeId: number, @User() user?: UserEntity): Promise<AttributeDto> {
		const res = await this.service.deleteById({ id: attributeId });
		return AttributeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}
}

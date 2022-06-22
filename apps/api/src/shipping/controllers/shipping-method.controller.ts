import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../../auth/auth.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from '../dto/shipping-method.dto';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';
import { ShippingService } from '../shipping.service';

@Controller('shipping')
@ApiTags('Shipping')
@ApiBearerAuth()
export class ShippingMethodController {
	constructor(private readonly shippingService: ShippingService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => CreateShippingMethodDto })
	@IsStaff()
	async create(@Body() dto: CreateShippingMethodDto, @User() user?: UserEntity) {
		const res = await this.shippingService.createMethod({ dto: dto });
		return ShippingMethodDto.prepare(res, { isAdmin: user?.isStaff || false });
	}


	@Get()
	@ApiOkResponse({ type: () => ShippingMethodDto, isArray: true })
	@ApiQuery({ type: Number, required: false, name: 'addressId' })
	@IsPublic()
	async getAll(@Query('addressId') addressId?: number, @User() user?: UserEntity) {
		let res: ShippingMethodEntity[];
		if ( addressId ) res = await this.shippingService.getOfAddress({ addressId });
		else res = await this.shippingService.getAll();
		return res.map(r => ShippingMethodDto.prepare(r, { isAdmin: user?.isStaff || false }));
	}

	@Get('/:methodId')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiOkResponse({ type: () => ShippingMethodDto })
	@IsPublic()
	async getOne(@Param('methodId') methodId?: number, @User() user?: UserEntity) {
		const res = await this.shippingService.getById({ id: methodId });
		return ShippingMethodDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Patch('/:methodId')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => UpdateShippingMethodDto })
	@IsStaff()
	async updateMethod(@Param('methodId', ParseIntPipe) methodId: number, @Body() dto: UpdateShippingMethodDto, @User() user?: UserEntity) {
		const res = await this.shippingService.updateMethod({ dto: dto, id: methodId });
		return ShippingMethodDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Delete('/:id')
	@ApiParam({ type: Number, name: 'id' })
	@ApiOkResponse({ type: () => ShippingMethodDto })
	@IsStaff()
	async deleteById(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity) {
		const res = await this.shippingService.deleteById({ id: id });
		return ShippingMethodDto.prepare(res, { isAdmin: user?.isStaff || false });
	}
}

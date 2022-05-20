import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from '../dto/shipping-method.dto';
import { ShippingMethodEntity } from '../entities/shipping-method.entity';
import { ShippingService } from '../shipping.service';

@Controller('shipping')
@ApiTags('Shipping')
export class ShippingMethodController {
	constructor(private readonly shippingService: ShippingService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => CreateShippingMethodDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(@Body() dto: CreateShippingMethodDto) {
		const res = await this.shippingService.createMethod({ dto: dto });
		return ShippingMethodDto.prepare(res);
	}


	@Get()
	@ApiOkResponse({ type: () => ShippingMethodDto, isArray: true })
	@ApiQuery({ type: Number, required: false, name: 'addressId' })
	async getAll(@Query('addressId') addressId?: number) {
		let res: ShippingMethodEntity[];
		if ( addressId ) res = await this.shippingService.getOfAddress({ addressId });
		else res = await this.shippingService.getAll();
		return res.map(r => ShippingMethodDto.prepare(r));
	}

	@Get('/:methodId')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiOkResponse({ type: () => ShippingMethodDto })
	async getOne(@Param('methodId') methodId?: number) {
		const res = await this.shippingService.getById({ id: methodId });
		return ShippingMethodDto.prepare(res);
	}

	@Patch('/:methodId')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => UpdateShippingMethodDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async updateMethod(@Param('methodId', ParseIntPipe) methodId: number, @Body() dto: UpdateShippingMethodDto) {
		const res = await this.shippingService.updateMethod({ dto: dto, id: methodId });
		return ShippingMethodDto.prepare(res);
	}

	@Delete('/:id')
	@ApiParam({ type: Number, name: 'id' })
	@ApiOkResponse({ type: () => ShippingMethodDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.shippingService.deleteById({ id: id });
		return ShippingMethodDto.prepare(res);
	}
}

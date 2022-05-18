import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from './dto/shipping-method.dto';
import { CreateShippingZoneDto, ShippingZoneDto, UpdateShippingZoneDto } from './dto/shipping-zone.dto';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { ShippingService } from './shipping.service';

@Controller('shipping')
@ApiTags('Shipping')
export class ShippingController {
	constructor(private readonly shippingService: ShippingService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => CreateShippingMethodDto })
	async create(@Body() dto: CreateShippingMethodDto) {
		const res = await this.shippingService.createMethod({ dto: dto });
		return ShippingMethodDto.prepare(res);
	}

	@Post('/:methodId/zones')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiCreatedResponse({ type: () => ShippingZoneDto })
	@ApiBody({ type: () => CreateShippingZoneDto })
	async createZone(@Param('methodId', ParseIntPipe) methodId: number, @Body() dto: CreateShippingZoneDto) {
		const res = await this.shippingService.createZone({ dto: dto, methodId: methodId });
		return ShippingZoneDto.prepare(res);
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

	@Patch('/:methodId')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	@ApiBody({ type: () => UpdateShippingMethodDto })
	async updateMethod(@Param('methodId', ParseIntPipe) methodId: number, @Body() dto: UpdateShippingMethodDto) {
		const res = await this.shippingService.updateMethod({ dto: dto, id: methodId });
		return ShippingMethodDto.prepare(res);
	}

	@Patch('/:methodId/zones/:id')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiParam({ type: Number, name: 'id' })
	@ApiCreatedResponse({ type: () => ShippingZoneDto })
	@ApiBody({ type: () => UpdateShippingZoneDto })
	async updateZone(@Param('id', ParseIntPipe) zoneId: number, @Body() dto: UpdateShippingZoneDto) {
		const res = await this.shippingService.updateZone({ dto: dto, id: zoneId });
		return ShippingZoneDto.prepare(res);
	}

	@Delete('/:id')
	@ApiParam({ type: Number, name: 'id' })
	@ApiOkResponse({ type: () => ShippingMethodDto })
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.shippingService.deleteById({ id: id });
		return ShippingMethodDto.prepare(res);
	}
}

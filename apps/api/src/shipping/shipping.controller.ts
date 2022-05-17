import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from './dto/shipping-method.dto';
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

	@Get()
	@ApiOkResponse({ type: () => ShippingMethodDto, isArray: true })
	@ApiQuery({ type: Number, required: false, name: 'addressId' })
	async getAll(@Query('addressId') addressId?: number) {
		let res: ShippingMethodEntity[];
		if ( addressId ) res = await this.shippingService.getOfAddress({ addressId });
		else res = await this.shippingService.getAll();
		return res.map(r => ShippingMethodDto.prepare(r));
	}

	@Patch('/:id')
	@ApiParam({ type: Number, name: 'id' })
	@ApiCreatedResponse({ type: () => ShippingMethodDto })
	async updateMethod(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShippingMethodDto) {
		const res = await this.shippingService.updateMethod({ dto: dto, id: id });
		return ShippingMethodDto.prepare(res);
	}
}

import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateShippingMethodDto, ShippingMethodDto, UpdateShippingMethodDto } from './dto/shipping-method.dto';
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
		return this.shippingService.createMethod({ dto: dto });
	}

	@Get()
	@ApiOkResponse({ type: () => ShippingMethodDto, isArray: true })
	@ApiQuery({ type: Number, required: false, name: 'addressId' })
	async getAll(@Query('addressId') addressId?: number) {
		if ( addressId ) return this.shippingService.getOfAddress({ addressId });
		return this.shippingService.getAll();
	}

	@Patch('/:id')
	@ApiParam({ type: Number, name: 'id' })
	async updateMethod(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateShippingMethodDto) {
		return this.shippingService.updateMethod({ dto: dto, id: id });
	}
}

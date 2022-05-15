import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, OrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {
	}

	@Post()
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: CreateOrderDto })
	create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
		return this.orderService.create({ createOrderDto });
	}

	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.findOne({ id });
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update({ id, updateOrderDto });
	}

	@Delete(':id')
	@ApiOkResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.remove({ id });
	}
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	CreateOrderDto,
	CreateOrderFromCheckoutDto,
	OrderDto,
	OrderListPaginated,
	UpdateOrderDto,
} from './dto/order.dto';
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

	@Post('/token')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: CreateOrderFromCheckoutDto })
	createFromCheckout(@Body() createOrderDto: CreateOrderFromCheckoutDto): Promise<OrderDto> {
		return this.orderService.createFromCheckout(createOrderDto);
	}

	@Get()
	@ApiQuery({ type: Number, required: false, name: 'page' })
	@ApiQuery({ type: Number, required: false, name: 'itemsPerPage' })
	@ApiOkResponse({ type: OrderListPaginated })
	async findAll(@Query('page') page?: number, @Query('itemsPerPage') itemsPerPage?: number): Promise<OrderListPaginated> {
		const res = await this.orderService.findAll({ page, itemsPerPage });
		return {
			items: res.items.map(OrderDto.prepare),
			pageNumber: res.pageNumber,
			pageSize: res.pageSize,
			totalCount: res.totalCount,
		};

	}

	@Get(':id')
	@ApiOkResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const res = await this.orderService.findOne({ id });
		return OrderDto.prepare(res);
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

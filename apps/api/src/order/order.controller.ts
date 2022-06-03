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
import { IsPublic, IsStaff } from '../auth/auth.decorator';
import {
	CreateOrderDto,
	CreateOrderFromCheckoutDto,
	OrderDto,
	OrderListPaginated,
	UpdateOrderDto,
	UpdateOrderStatusDto,
} from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Orders')
@ApiBearerAuth()
export class OrderController {
	constructor(private readonly orderService: OrderService) {
	}

	@Post()
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: CreateOrderDto })
	@IsStaff()
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
	@IsStaff()
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
	@IsPublic()
	async findOne(@Param('id', ParseIntPipe) id: number) {
		const res = await this.orderService.findOne({ id });
		return OrderDto.prepare(res);
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	@IsStaff()
	update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update({ id, updateOrderDto });
	}


	@Patch(':id/status')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: UpdateOrderStatusDto })
	@ApiParam({ type: Number, name: 'id' })
	updateStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
		return this.orderService.updateStatus({ id, updateOrderStatusDto });
	}

	@Delete(':id')
	@ApiOkResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	@IsStaff()
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.remove({ id });
	}
}

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
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UpdatePaymentStatusDto } from '../payments/dto/payment.dto';
import { UserEntity } from '../users/entities/user.entity';
import { CreateOrderEventDto, OrderEventDto } from './dto/order-event.dto';
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

	@Post(':id/events')
	@ApiCreatedResponse({ type: OrderEventDto })
	@ApiBody({ type: CreateOrderEventDto })
	@ApiQuery({ type: Boolean, name: 'notifyCustomer', required: false, example: false })
	@IsStaff()
	createOrderEvent(@Body() createOrderEventDto: CreateOrderEventDto, @Param('id', ParseIntPipe) id: number, @Query('notifyCustomer') notifyCustomer?: boolean) {
		return this.orderService.createOrderEvent({ orderId: id, createOrderEventDto: createOrderEventDto, notifyCustomer: notifyCustomer });
	}

	@Post('/token')
	@IsPublic()
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: CreateOrderFromCheckoutDto })
	@IsPublic()
	createFromCheckout(@Body() createOrderDto: CreateOrderFromCheckoutDto, @User() user?: UserEntity): Promise<OrderDto> {
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
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
		const res = await this.orderService.update({ id, updateOrderDto });
		return OrderDto.prepare(res);
	}


	@Patch(':id/status')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: UpdateOrderStatusDto })
	@ApiParam({ type: Number, name: 'id' })
	async updateStatus(@Param('id') id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
		const res = await this.orderService.updateStatus({ id, updateOrderStatusDto });
		return OrderDto.prepare(res);
	}

	@Patch(':id/payment/status')
	@ApiCreatedResponse({ type: OrderDto })
	@ApiBody({ type: UpdatePaymentStatusDto })
	@ApiParam({ type: Number, name: 'id' })
	@ApiQuery({ type: Boolean, name: 'notifyCustomer', required: false, example: false })
	async updatePaymentStatus(@Param('id') id: number, @Body() updatePaymentStatusDto: UpdatePaymentStatusDto, @Query('notifyCustomer') notifyCustomer?: boolean) {
		const res = await this.orderService.updatePaymentStatus({ id, updatePaymentStatusDto, notifyCustomer });
		return OrderDto.prepare(res);
	}

	@Delete(':id')
	@ApiOkResponse({ type: OrderDto })
	@ApiParam({ type: Number, name: 'id' })
	@IsStaff()
	async remove(@Param('id', ParseIntPipe) id: number) {
		const res = await this.orderService.remove({ id });
		return OrderDto.prepare(res);
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiscountSalesService } from './discount-sales.service';
import { CreateDiscountSaleDto, UpdateDiscountDto } from './dto/discount-sale.dto';

@Controller('discounts')
@ApiTags('Discount')
export class DiscountSalesController {
	constructor(private readonly discountsService: DiscountSalesService) {
	}

	@Post()
	create(@Body() createDiscountDto: CreateDiscountSaleDto) {
		return this.discountsService.create(createDiscountDto);
	}

	@Get()
	findAll() {
		return this.discountsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.discountsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
		return this.discountsService.update(+id, updateDiscountDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.discountsService.remove(+id);
	}
}

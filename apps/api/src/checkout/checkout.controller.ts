import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto, UpdateCheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
	constructor(private readonly checkoutService: CheckoutService) {
	}

	@Post()
	create(@Body() createCheckoutDto: CreateCheckoutDto) {
		return this.checkoutService.create(createCheckoutDto);
	}

	@Get()
	findAll() {
		return this.checkoutService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.checkoutService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCheckoutDto: UpdateCheckoutDto) {
		return this.checkoutService.update(+id, updateCheckoutDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.checkoutService.remove(+id);
	}
}

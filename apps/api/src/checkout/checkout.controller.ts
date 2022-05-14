import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AddressDto } from '../core/dto/address.dto';
import { CreateAddressDto } from '../core/entities/address.entity';
import { CheckoutService } from './checkout.service';
import { UpdateCheckoutLineDto } from './dto/checkout-line.dto';
import { CheckoutDto, CreateCheckoutDto, UpdateCheckoutDto, UpdateCheckoutVoucherDto } from './dto/checkout.dto';

@Controller('checkout')
@ApiTags('Checkout')
export class CheckoutController {
	constructor(private readonly checkoutService: CheckoutService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => CreateCheckoutDto })
	async create(@Body() createCheckoutDto: CreateCheckoutDto) {
		const res = await this.checkoutService.create({ createCheckoutDto: createCheckoutDto });
		return CheckoutDto.prepare(res);
	}

	@Get(':token')
	@ApiOkResponse({ type: () => CheckoutDto })
	@ApiParam({ type: String, name: 'token' })
	async findOne(@Param('token') token: string) {
		const res = await this.checkoutService.findOne({ token: token });
		return CheckoutDto.prepare(res);
	}

	@Patch(':token')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutDto })
	@ApiParam({ type: String, name: 'token' })
	async update(@Param('token') token: string, @Body() updateCheckoutDto: UpdateCheckoutDto) {
		const res = await this.checkoutService.updateInfo({
			token: token, updateCheckoutDto,
		});
		return CheckoutDto.prepare(res);
	}

	@Patch(':token/lines')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutLineDto })
	async updateLines(@Param('token') token: string, @Body() dto: UpdateCheckoutLineDto) {
		const res = await this.checkoutService.updateLines({ token: token, dto: dto });
		return CheckoutDto.prepare(res);
	}

	@Patch(':token/address')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => CreateAddressDto })
	@ApiQuery({ type: Boolean, name: 'shipping', required: false })
	@ApiQuery({ type: Boolean, name: 'billing', required: false })
	async updateAddress(@Param('token') token: string, @Body() address: AddressDto, @Query('shipping') shipping?: boolean, @Query('billing') billing?: boolean) {
		const res = await this.checkoutService.updateAddress({ token: token, dto: address, billing: billing, shipping: shipping });
		return CheckoutDto.prepare(res);
	}

	@Patch(':token/voucher')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutVoucherDto })
	async updateVoucher(@Param('token') token: string, @Body() dto: UpdateCheckoutVoucherDto) {
		const res = await this.checkoutService.updateVoucher({ token: token, dto: dto });
		return CheckoutDto.prepare(res);
	}
}

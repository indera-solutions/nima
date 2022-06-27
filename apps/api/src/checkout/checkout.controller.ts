import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from '../auth/auth.decorator';
import { AddressDto } from '../core/dto/address.dto';
import { CreateAddressDto } from '../core/entities/address.entity';
import { CheckoutService } from './checkout.service';
import { UpdateCheckoutLineDto } from './dto/checkout-line.dto';
import { CheckoutDto, CreateCheckoutDto, UpdateCheckoutDto, UpdateCheckoutVoucherDto } from './dto/checkout.dto';

@Controller('checkout')
@ApiTags('Checkout')
@ApiBearerAuth()
export class CheckoutController {
	constructor(private readonly checkoutService: CheckoutService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => CreateCheckoutDto })
	@IsPublic()
	async create(@Body() createCheckoutDto: CreateCheckoutDto) {
		const res = await this.checkoutService.create({ createCheckoutDto: createCheckoutDto });
		return await this.checkoutService.getDto(res);
	}

	@Get(':token')
	@ApiOkResponse({ type: () => CheckoutDto })
	@ApiParam({ type: String, name: 'token' })
	@IsPublic()
	async findOne(@Param('token') token: string) {
		return await this.checkoutService.getDto(token);
	}

	@Patch(':token')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutDto })
	@ApiParam({ type: String, name: 'token' })
	@IsPublic()
	async update(@Param('token') token: string, @Body() updateCheckoutDto: UpdateCheckoutDto) {
		await this.checkoutService.updateInfo({
			token: token, updateCheckoutDto,
		});
		return await this.checkoutService.getDto(token);
	}

	@Patch(':token/lines')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutLineDto })
	@IsPublic()
	async updateLines(@Param('token') token: string, @Body() dto: UpdateCheckoutLineDto) {
		await this.checkoutService.updateLines({ token: token, dto: dto });
		return await this.checkoutService.getDto(token);
	}

	@Patch(':token/address')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => CreateAddressDto })
	@ApiQuery({ type: Boolean, name: 'shipping', required: false })
	@ApiQuery({ type: Boolean, name: 'billing', required: false })
	@IsPublic()
	async updateAddress(@Param('token') token: string, @Body() address: AddressDto, @Query('shipping') shipping?: boolean, @Query('billing') billing?: boolean) {
		await this.checkoutService.updateAddress({ token: token, dto: address, billing: billing, shipping: shipping });
		return await this.checkoutService.getDto(token);
	}

	@Patch(':token/voucher')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@ApiBody({ type: () => UpdateCheckoutVoucherDto })
	@IsPublic()
	async updateVoucher(@Param('token') token: string, @Body() dto: UpdateCheckoutVoucherDto) {
		await this.checkoutService.updateVoucher({ token: token, dto: dto });
		return await this.checkoutService.getDto(token);
	}

	@Delete(':token')
	@ApiCreatedResponse({ type: () => CheckoutDto })
	@IsPublic()
	async deleteCheckout(@Param('token') token: string) {
		const res = await this.checkoutService.getDto(token);
		await this.checkoutService.remove({ token: token });
		return res;
	}
}

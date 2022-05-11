import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { AddressEntity } from '../core/entities/address.entity';
import { ProductVariantService } from '../products/product-variant.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CheckoutLineDto } from './dto/checkout-line.dto';
import { CreateCheckoutDto, UpdateCheckoutDto, UpdateCheckoutVoucherDto } from './dto/checkout.dto';
import { CheckoutLineRepository } from './entities/checkout-line.repository';
import { CheckoutEntity } from './entities/checkout.entity';
import { CheckoutRepository } from './entities/checkout.repository';

@Injectable()
export class CheckoutService {
	constructor(
		private checkoutRepository: CheckoutRepository,
		private checkoutLineRepository: CheckoutLineRepository,
		private addressService: AddressService,
		private usersService: UsersService,
		private variantService: ProductVariantService,
	) {
	}

	@Transactional()
	async create(params: { createCheckoutDto: CreateCheckoutDto }): Promise<CheckoutEntity> {
		const { createCheckoutDto } = params;

		let billing: AddressEntity, shipping: AddressEntity, user: UserEntity;

		if ( createCheckoutDto.billingAddressId ) {
			billing = await this.addressService.findById({ id: createCheckoutDto.billingAddressId });
			if ( !billing ) throw new NotFoundException('BILLING_ADDRESS_NOT_FOUND');
		}

		if ( createCheckoutDto.shippingAddressId ) {
			shipping = await this.addressService.findById({ id: createCheckoutDto.shippingAddressId });
			if ( !shipping ) throw new NotFoundException('SHIPPING_ADDRESS_NOT_FOUND');
		}

		if ( createCheckoutDto.userId ) {
			user = await this.usersService.findOne(createCheckoutDto.userId);
			if ( !user ) throw new NotFoundException('USER_NOT_FOUND');
		}

		const co = await this.checkoutRepository.insert({ ...createCheckoutDto, billingAddress: billing, shippingAddress: shipping, user: user });

		return this.findOne({ token: co.identifiers[0].token });
	}

	async findOne(params: { token: string }) {
		return this.checkoutRepository.findByToken(params.token);
	}

	async updateInfo(params: { token: string, updateCheckoutDto: UpdateCheckoutDto }) {
		const { updateCheckoutDto, token } = params;
		const co = await this.findOne({ token: token });

		if ( updateCheckoutDto.languageCode ) co.languageCode = updateCheckoutDto.languageCode;
		if ( updateCheckoutDto.email ) co.email = updateCheckoutDto.email;
		if ( updateCheckoutDto.note ) co.note = updateCheckoutDto.note;

		return await this.checkoutRepository.save(co);
	}

	async updateVoucher(params: { token: string, dto: UpdateCheckoutVoucherDto }) {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });

		co.voucherCode = dto.voucherCode;

		return await this.checkoutRepository.save(co);
	}

	async updateLines(params: { token: string, dto: CheckoutLineDto }): Promise<CheckoutEntity> {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });
		const variant = await this.variantService.getById({ id: dto.variantId });
		if ( dto.quantity > 0 ) await this.checkoutLineRepository.save({ checkout: co, variant: variant, quantity: dto.quantity });
		if ( dto.quantity <= 0 ) await this.checkoutLineRepository.deleteByVariantAndToken(dto.variantId, token);
		return this.findOne({ token: token });
	}

	async updateAddress(params: { token: string, dto: AddressDto, billing?: boolean, shipping?: boolean }): Promise<CheckoutEntity> {
		const { dto, token, billing, shipping } = params;
		const co = await this.findOne({ token: token });
		const address = await this.addressService.create({ dto: dto });
		if ( billing && shipping || !billing && !shipping ) {
			co.billingAddress = address;
			co.shippingAddress = address;
		} else if ( billing ) co.billingAddress = address;
		else if ( shipping ) co.shippingAddress = address;
		return this.checkoutRepository.save(co);
	}

	async remove(params: { token: string }) {
		const { token } = params;
		const co = await this.findOne({ token: token });
		if ( !co ) throw new NotFoundException('CHECKOUT_NOT_FOUND');
		await this.checkoutRepository.deleteByToken(token);
		return co;
	}
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { ProductVariantService } from '../products/product-variant.service';
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

		// let billing: AddressEntity, shipping: AddressEntity, user: UserEntity;
		//
		// if ( createCheckoutDto.billingAddressId ) {
		// 	billing = await this.addressService.findById({ id: createCheckoutDto.billingAddressId });
		// 	if ( !billing ) throw new NotFoundException('BILLING_ADDRESS_NOT_FOUND');
		// }
		//
		// if ( createCheckoutDto.shippingAddressId ) {
		// 	shipping = await this.addressService.findById({ id: createCheckoutDto.shippingAddressId });
		// 	if ( !shipping ) throw new NotFoundException('SHIPPING_ADDRESS_NOT_FOUND');
		// }
		//
		// if ( createCheckoutDto.userId ) {
		// 	user = await this.usersService.findOne(createCheckoutDto.userId);
		// 	if ( !user ) throw new NotFoundException('USER_NOT_FOUND');
		// }

		const co = await this.checkoutRepository.insert({ ...createCheckoutDto });

		return this.findOne({ token: co.identifiers[0].token });
	}

	async findOne(params: { token: string }) {
		return this.checkoutRepository.findByToken(params.token);
	}

	async updateInfo(params: { token: string, updateCheckoutDto: UpdateCheckoutDto }) {
		const { updateCheckoutDto, token } = params;
		await this.checkoutRepository.update(token, updateCheckoutDto);
		return await this.findOne({ token });
	}

	async updateVoucher(params: { token: string, dto: UpdateCheckoutVoucherDto }) {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });

		co.voucherCode = dto.voucherCode;

		await this.checkoutRepository.save(co);

		return this.findOne({ token });
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
		const { dto, token } = params;
		let { billing, shipping } = params;
		const co = await this.findOne({ token: token });
		if ( !co ) throw new NotFoundException('CHECKOUT_NOT_FOUND');
		if ( !billing && !shipping ) {
			billing = true;
			shipping = true;
		}
		if ( billing ) {
			co.billingAddress = await this.addressService.create({ dto, id: co.billingAddress?.id });
		}

		if ( shipping ) {
			co.shippingAddress = await this.addressService.create({ dto, id: co.shippingAddress?.id });
			// TODO update shipping cost
		}
		await this.checkoutRepository.save(co);
		return await this.findOne({ token });
	}

	async remove(params: { token: string }) {
		const { token } = params;
		const co = await this.findOne({ token: token });
		if ( !co ) throw new NotFoundException('CHECKOUT_NOT_FOUND');
		await this.checkoutRepository.deleteByToken(token);
		return co;
	}
}

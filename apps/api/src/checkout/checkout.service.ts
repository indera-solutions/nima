import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { ProductVariantService } from '../products/product-variant.service';
import { ShippingMethodDto } from '../shipping/dto/shipping-method.dto';
import { ShippingService } from '../shipping/shipping.service';
import { UsersService } from '../users/users.service';
import { CheckoutLineDto, UpdateCheckoutLineDto } from './dto/checkout-line.dto';
import {
	CheckoutAvailableShippingDto,
	CheckoutDto,
	CreateCheckoutDto,
	UpdateCheckoutDto,
	UpdateCheckoutVoucherDto,
} from './dto/checkout.dto';
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
		private shippingService: ShippingService,
	) {
	}

	@Transactional()
	async create(params: { createCheckoutDto: CreateCheckoutDto }): Promise<string> {
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
		return co.identifiers[0].token;
	}

	async findOne(params: { token: string }): Promise<CheckoutEntity> {
		const res = await this.checkoutRepository.getWholeObject(params.token);
		if ( !res ) {
			throw new NotFoundException('CHECKOUT_NOT_FOUND');
		}
		return res;
	}

	async updateInfo(params: { token: string, updateCheckoutDto: UpdateCheckoutDto }): Promise<void> {
		const { updateCheckoutDto, token } = params;
		const { shippingMethodId, ...rest } = updateCheckoutDto;
		if ( shippingMethodId ) {
			rest.shippingMethod = await this.shippingService.getById({
				id: shippingMethodId,
			});
		}
		await this.checkoutRepository.update(token, rest);
		if ( updateCheckoutDto.useShippingAsBilling ) {
			await this.setShippingAsBilling(token);
		}
	}

	async updateVoucher(params: { token: string, dto: UpdateCheckoutVoucherDto }): Promise<void> {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });

		co.voucherCode = dto.voucherCode;

		await this.checkoutRepository.save(co);
	}

	async updateLines(params: { token: string, dto: UpdateCheckoutLineDto }): Promise<void> {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });
		const variant = await this.variantService.getByIdWithoutEager({ id: dto.variantId });
		if ( dto.quantity > 0 ) await this.checkoutLineRepository.save({ checkout: co, variant: variant, quantity: dto.quantity, product: { id: variant.productId } });
		if ( dto.quantity <= 0 ) await this.checkoutLineRepository.deleteByVariantAndToken(dto.variantId, token);
	}

	async updateAddress(params: { token: string, dto: AddressDto, billing?: boolean, shipping?: boolean }): Promise<void> {
		const { dto, token } = params;
		let { billing, shipping } = params;
		const co = await this.checkoutRepository.findOne({
			where: {
				token,
			},
			relations: ['billingAddress', 'shippingAddress'],
		});
		if ( !billing && !shipping ) {
			billing = true;
			shipping = true;
		}
		if ( billing ) {
			co.billingAddress = await this.addressService.create({ dto, id: co.billingAddress?.id });
		}

		if ( shipping ) {
			co.shippingAddress = await this.addressService.create({ dto, id: co.shippingAddress?.id });
		}


		await this.checkoutRepository.save(co);

	}

	async remove(params: { token: string }) {
		const { token } = params;
		const co = await this.findOne({ token: token });
		await this.checkoutRepository.deleteByToken(token);
		return co;
	}

	async getWholeObject(token: string): Promise<CheckoutEntity> {
		const entity = await this.checkoutRepository.getWholeObject(token);
		if ( !entity ) {
			throw new NotFoundException('CHECKOUT_NOT_FOUND');
		}
		return entity;
	}

	async getDto(token: string): Promise<CheckoutDto> {
		const entity = await this.checkoutRepository.getWholeObject(token);
		if ( !entity ) {
			throw new NotFoundException('CHECKOUT_NOT_FOUND');
		}
		if ( !entity.lines ) throw new Error('MISSING_CHECKOUT_LINES');

		let weight = 0;

		const minPrices = await this.variantService.getLowestPrices(entity.lines.map(line => line.variantId));
		const discounts: number[] = [];

		const lines: CheckoutLineDto[] = entity.lines.map(line => {
			if ( !line.variant ) throw new Error('MISSING_VARIANT');
			const minPrice = minPrices.find(value => value.id === line.variantId);
			const totalCost = line.quantity * line.variant.priceAmount;
			const discountedTotalCost = line.quantity * (minPrice.sale ? minPrice.lowestPrice : minPrice.basePrice);
			discounts.push(totalCost - discountedTotalCost);
			weight += line.variant.weight || 0;
			return {
				quantity: line.quantity,
				variantId: line.variantId,
				productId: line.productId,
				totalCost,
				discountedTotalCost,
			};
		});

		const subtotalPrice = lines.reduce((previousValue, currentValue) => previousValue + currentValue.totalCost, 0);
		const quantity = lines.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);

		let shippingCost = 0;
		const discount = discounts.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

		const availableShippingMethods: CheckoutAvailableShippingDto[] = [];

		if ( entity.shippingAddress ) {

			const validMethods = await this.shippingService.getValidMethodsOfAddress(entity.shippingAddress, weight, subtotalPrice);
			for ( const validMethod of validMethods ) {
				const shippingMethod = ShippingMethodDto.prepare(validMethod);
				const rate = ShippingMethodDto.calculateCost(shippingMethod);
				availableShippingMethods.push({ shippingMethod: shippingMethod, rate: rate });
			}
			let activeShipping = entity.shippingMethod ? validMethods.find(e => e.id === entity.shippingMethod.id) : undefined;

			if ( !activeShipping && validMethods.length > 0 ) {
				await this.updateInfo({
					token: token,
					updateCheckoutDto: {
						shippingMethodId: validMethods[0]?.id,
					},
				});
				entity.shippingMethod = validMethods[0];
				activeShipping = validMethods[0];

			}
			shippingCost = ShippingMethodDto.calculateCost(activeShipping);
		}


		const totalCost = subtotalPrice + shippingCost - discount;

		return {
			token: entity.token,
			user: undefined,
			created: entity.created,
			shippingAddress: entity.shippingAddress,
			billingAddress: entity.billingAddress,
			lines: lines,
			note: entity.note,
			email: entity.email,
			voucherCode: entity.voucherCode,
			metadata: entity.metadata,
			privateMetadata: entity.privateMetadata,
			currency: entity.currency,
			discountAmount: entity.discountAmount,
			discountName: entity.discountName,
			languageCode: entity.languageCode,
			lastChange: entity.lastChange,
			redirectUrl: entity.redirectUrl,
			shippingMethod: entity.shippingMethod ? ShippingMethodDto.prepare(entity.shippingMethod) : undefined,
			trackingCode: entity.trackingCode,
			paymentMethod: entity.paymentMethod,
			translatedDiscountName: entity.translatedDiscountName,
			totalCost,
			shippingCost,
			quantity,
			discount,
			subtotalPrice,
			useShippingAsBilling: entity.useShippingAsBilling,
			availableShippingMethods: availableShippingMethods,
		};
	}

	private async setShippingAsBilling(token) {
		const checkout = await this.checkoutRepository.findOne({
			where: {
				token: token,
			},
			relations: ['shippingAddress'],
		});
		if ( !checkout || !checkout.shippingAddress ) return;
		await this.updateAddress({
			token: token,
			dto: checkout.shippingAddress,
			billing: true,
		});
	}
}

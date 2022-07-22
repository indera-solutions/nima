import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { roundToDigit } from '@nima-cms/utils';
import * as dayjs from 'dayjs';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { DiscountVoucherService } from '../discounts/discount-voucher.service';
import { DiscountType, DiscountVoucherType } from '../discounts/dto/discount.enum';
import { DiscountVoucherEntity } from '../discounts/entities/discount-voucher.entity';
import { OrderService } from '../order/order.service';
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
		private voucherService: DiscountVoucherService,
		@Inject(forwardRef(() => OrderService))
		private orderService: OrderService,
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

	async updateVoucher(params: { token: string, dto: UpdateCheckoutVoucherDto }, options?: { isStaff?: boolean, userId?: number }): Promise<void> {
		const { dto, token } = params;

		const voucher = await this.voucherService.findByCode({ code: dto.voucherCode });
		const co = await this.getDto(token);
		if ( voucher.minCheckoutItemsQuantity > co.quantity ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'Not enough items in cart');
		if ( voucher.minSpentAmount > co.subtotalPrice ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'Subtotal under voucher limit');
		if ( voucher.usageLimit > 0 && voucher.usageLimit <= voucher.used ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'Code usage limit exceeded');
		if ( voucher.onlyForStaff && !(options && options.isStaff) ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'This code is only for staff');
		const now = dayjs();
		if ( dayjs(voucher.startDate).isAfter(now) ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'This code is not enabled at this time');
		if ( voucher.endDate && dayjs(voucher.endDate).isBefore(now) ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'This code is not enabled at this time');
		if ( voucher.applyOncePerCustomer && options?.userId ) {
			const res = await this.orderService.findOfUser(options.userId);
			for ( const order of res ) {
				if ( order.voucherId === voucher.id ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'This code can only be used once per customer');
			}
		}

		let isApplicable = false;
		const voucherVariants = await this.voucherService.findVariationsOfVoucher(voucher.id);
		if ( voucherVariants.length === 0 ) {
			isApplicable = true;
		} else {
			for ( const line of co.lines ) {
				if ( voucherVariants.includes(line.variantId) ) {
					isApplicable = true;
				}
			}
		}
		if ( !isApplicable ) throw new BadRequestException('VOUCHER_NOT_APPLICABLE', 'Cart does not contained promotional items');
		await this.checkoutRepository.update(token, dto);
	}

	async updateLines(params: { token: string, dto: UpdateCheckoutLineDto }): Promise<void> {
		const { dto, token } = params;
		const co = await this.findOne({ token: token });
		const variant = await this.variantService.getByIdWithoutEager({ id: dto.variantId });
		if ( dto.quantity > 0 ) {
			const canBeAdded = variant.trackInventory ? variant.stock >= dto.quantity : true;
			if ( canBeAdded ) {
				await this.checkoutLineRepository.save({ checkout: co, variant: variant, quantity: dto.quantity, product: { id: variant.productId } });
			} else {
				throw new BadRequestException('INSUFFICIENT_STOCK');
			}
		}
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

		const discounts: number[] = [];

		let voucher: DiscountVoucherEntity = undefined;
		let voucherVariants: number[] = [];
		if ( entity.voucherCode ) {
			try {
				voucher = await this.voucherService.findByCode({ code: entity.voucherCode });
				voucherVariants = await this.voucherService.findVariationsOfVoucher(voucher.id);
			} catch ( e ) {
				if ( e.message === 'VOUCHER_NOT_FOUND' ) {
					await this.checkoutRepository.update(token, {
						voucherCode: undefined,
					});
					entity.voucherCode = undefined;
				}
			}
		}

		const lines: CheckoutLineDto[] = entity.lines.map(line => {
			if ( !line.variant ) throw new Error('MISSING_VARIANT');
			const totalCost = line.quantity * (line.variant.discountedPrice || line.variant.priceAmount);
			let discountedTotalCost;
			let voucherDiscount;
			if ( line.variant.discountedPrice ) {
				discountedTotalCost = line.quantity * line.variant.discountedPrice;
			}
			if ( voucher && voucher.voucherType === DiscountVoucherType.SPECIFIC_PRODUCT && voucherVariants.includes(line.variantId) ) {
				const temp = discountedTotalCost || totalCost;
				if ( voucher.discountValueType === DiscountType.PERCENTAGE ) {
					voucherDiscount = voucher.applyOncePerOrder ? ((line.variant.discountedPrice || line.variant.priceAmount) * voucher.discountValue / 100) : (temp * voucher.discountValue / 100);
				} else if ( voucher.discountValueType === DiscountType.FLAT ) {
					voucherDiscount = voucher.applyOncePerOrder ? voucher.discountValue : (line.quantity * voucher.discountValue);
				}
				discounts.push(voucherDiscount);
				discountedTotalCost = temp - voucherDiscount;
			}
			weight += line.variant.weight || 0;
			return {
				quantity: line.quantity,
				variantId: line.variantId,
				productId: line.productId,
				totalCost,
				discountedTotalCost: discountedTotalCost,
			};
		});

		const _subtotalPrice = lines.reduce((previousValue, currentValue) => previousValue + currentValue.totalCost, 0);
		const subtotalPrice = roundToDigit(_subtotalPrice);
		const quantity = lines.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);

		let shippingCost = 0;
		let discount = discounts.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
		if ( voucher && voucher.voucherType === DiscountVoucherType.ENTIRE_ORDER ) {
			if ( voucher.discountValueType === DiscountType.PERCENTAGE ) {
				discount += subtotalPrice * voucher.discountValue / 100;
			} else if ( voucher.discountValueType === DiscountType.FLAT ) {
				discount += voucher.discountValue;
			}
		}

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
			shippingCost = (voucher && voucher.voucherType === DiscountVoucherType.SHIPPING && voucher.discountValueType === DiscountType.FREE_SHIPPING) ? 0 : ShippingMethodDto.calculateCost(activeShipping);
		}

		const totalCost = roundToDigit(subtotalPrice + shippingCost - discount);

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

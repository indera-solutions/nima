import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginatedResults } from '@nima-cms/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CheckoutService } from '../checkout/checkout.service';
import { DiscountVoucherService } from '../discounts/discount-voucher.service';
import { DiscountVoucherType } from '../discounts/dto/discount.enum';
import { DiscountVoucherEntity } from '../discounts/entities/discount-voucher.entity';
import { CommerceOrderEventClient } from '../email/commerce.order.event.client';
import { UpdatePaymentStatusDto } from '../payments/dto/payment.dto';
import { PaymentMethod, PaymentStatus } from '../payments/entities/payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { ProductVariantService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import { ShippingService } from '../shipping/shipping.service';
import { CreateOrderEventDto } from './dto/order-event.dto';
import { InternalCreateOrderLineDto, OrderLineDto } from './dto/order-line.dto';
import { CreateOrderDto, UpdateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { OrderEventsEnum, OrderStatus } from './dto/order.enum';
import { OrderEventEntity } from './entities/order-event.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderEventRepository } from './repositories/order-event.repository';
import { OrderLineRepository } from './repositories/order-line.repository';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService {

	constructor(
		private orderRepository: OrderRepository,
		private orderLineRepository: OrderLineRepository,
		private orderEventRepository: OrderEventRepository,
		@Inject(forwardRef(() => CheckoutService))
		private checkoutService: CheckoutService,
		private shippingService: ShippingService,
		private productService: ProductsService,
		private variantService: ProductVariantService,
		private paymentService: PaymentsService,
		private voucherService: DiscountVoucherService,
		private eventEmitter: EventEmitter2,
	) {
	}

	async create(params: { createOrderDto: CreateOrderDto }): Promise<OrderEntity> {
		const { createOrderDto } = params;
		const res = await this.orderRepository.insert(createOrderDto);
		return this.findOne(res.identifiers[0].id);
	}

	@Transactional()
	async createFromCheckout(params: { token: string }) {
		const checkoutDto = await this.checkoutService.getDto(params.token);
		if ( !checkoutDto.shippingMethod ) throw new BadRequestException('CHECKOUT_NO_SELECTED_SHIPPING_METHOD');
		const shippingMethod = await this.shippingService.getById({ id: checkoutDto.shippingMethod.id });

		let voucher: DiscountVoucherEntity = undefined;
		let voucherVariants: number[] = [];
		if ( checkoutDto.voucherCode ) {
			voucher = await this.voucherService.findByCode({ code: checkoutDto.voucherCode });
			voucherVariants = await this.voucherService.findVariationsOfVoucher(voucher.id);
		}

		const payment = await this.paymentService.save({
			dto: {
				currency: checkoutDto.currency,
				status: PaymentStatus.PENDING,
				amount: checkoutDto.totalCost,
				customerId: checkoutDto.email,
				description: '',
				method: PaymentMethod[checkoutDto.paymentMethod],
			},
		});

		const dto: CreateOrderDto = {
			languageCode: checkoutDto.languageCode,
			currency: checkoutDto.currency,
			privateMetadata: checkoutDto.privateMetadata,
			metadata: checkoutDto.metadata,
			redirectUrl: checkoutDto.redirectUrl,
			user: checkoutDto.user,
			billingAddress: checkoutDto.billingAddress,
			checkoutToken: checkoutDto.token,
			customerNote: checkoutDto.note,
			userEmail: checkoutDto.email,
			status: OrderStatus.UNCONFIRMED,
			shippingAddress: checkoutDto.shippingAddress,
			weight: 0,

			displayGrossPrices: true,
			origin: '',
			original: undefined,

			shippingMethod: shippingMethod,
			shippingMethodName: shippingMethod.name || '',
			shippingPriceGrossAmount: checkoutDto.shippingCost,
			/*Shipping without taxes*/
			shippingPriceNetAmount: 0,
			/*Shipping Tax Rate (Not yet implemented in the Shipping Method Entities)*/
			shippingTaxRate: 0,
			/*Shipment Tracking token. Should be received from the shipping managers*/
			trackingClientId: '0',

			totalGrossAmount: checkoutDto.totalCost,
			totalNetAmount: 0,
			totalPaidAmount: 0,
			undiscountedTotalGrossAmount: checkoutDto.subtotalPrice,
			undiscountedTotalNetAmount: 0,

			lines: [],

			payment: payment,
			voucherCode: voucher?.code,
		};

		const order = await this.orderRepository.save({ ...dto, voucher: voucher });

		await this.orderEventRepository.save({
			order: order,
			eventType: OrderEventsEnum.DRAFT_CREATED,
			parameters: {},
		});

		// const minPrices = await this.variantService.getLowestPrices(checkoutDto.lines.map(line => line.variantId));

		for ( const line of checkoutDto.lines ) {
			const product = await this.productService.getById({ id: line.productId });
			const variant = await this.variantService.getById({ id: line.variantId });
			// const minPrice = minPrices.find(value => value.id === line.variantId);

			let voucherCode = undefined, unitDiscountReason = undefined;
			if ( voucher && voucher.voucherType === DiscountVoucherType.SPECIFIC_PRODUCT && voucherVariants.includes(line.variantId) ) {
				voucherCode = voucher.code;
				unitDiscountReason = variant.discountedPrice ? 'sale&voucher' : 'voucher';
			}

			const dto: InternalCreateOrderLineDto = {
				variant: variant,
				order: order,

				currency: checkoutDto.currency,
				quantity: line.quantity,
				quantityFulfilled: line.quantity,

				variantName: variant.name,
				productName: product.name,
				productSku: variant.sku,


				/*TODO: Implement Sales and Vouchers*/
				// sale: minPrice.sale,
				voucherCode: voucherCode,
				unitDiscountAmount: variant.priceAmount - variant.discountedPrice || 0,
				unitDiscountReason: unitDiscountReason ? unitDiscountReason : variant.discountedPrice ? 'sale' : '',
				unitDiscountType: unitDiscountReason ? unitDiscountReason : variant.discountedPrice ? 'sale' : '',
				unitDiscountValue: 0,

				/*Tax Rate handling not implemented yet*/
				taxRate: 0,

				/*Quantity Cost*/
				isShippingRequired: product.productType.isDigital,
				totalPriceGrossAmount: line.discountedTotalCost || line.totalCost,
				totalPriceNetAmount: 0,
				undiscountedTotalPriceGrossAmount: line.totalCost,
				undiscountedTotalPriceNetAmount: 0,

				/*Unit Costs*/
				unitPriceGrossAmount: line.totalCost,
				unitPriceNetAmount: 0,
				undiscountedUnitPriceGrossAmount: line.quantity * (variant.priceAmount || 0),
				undiscountedUnitPriceNetAmount: 0,
			};
			await this.orderLineRepository.insert(dto);
		}

		await this.orderEventRepository.save({
			order: order,
			eventType: OrderEventsEnum.ADDED_PRODUCTS,
			parameters: {},
		});

		if ( order.payment.method === PaymentMethod.CASH_ON_DELIVERY ) await CommerceOrderEventClient.orderCreated(this.eventEmitter, { order: order, notifyCustomer: true });

		await this.checkoutService.remove({ token: params.token });

		if ( voucher ) await this.voucherService.addOneUse(voucher.id);

		return this.findOne({ id: order.id });
	}

	@Transactional()
	async createOrderEvent(params: { orderId: number; createOrderEventDto: CreateOrderEventDto, notifyCustomer?: boolean }): Promise<OrderEventEntity> {
		const { createOrderEventDto, orderId, notifyCustomer } = params;
		const order = await this.findOne({ id: orderId });
		if ( createOrderEventDto.eventType === OrderEventsEnum.PAYMENT_REFUNDED )
			await CommerceOrderEventClient.orderRefunded(this.eventEmitter, { order: order, notifyCustomer: notifyCustomer });
		if ( createOrderEventDto.eventType === OrderEventsEnum.SHIPPED )
			await CommerceOrderEventClient.orderShipped(this.eventEmitter, { order: order, notifyCustomer: notifyCustomer });
		return this.orderEventRepository.save({ order: order, ...createOrderEventDto });
	}

	async findOne(params: { id: number }): Promise<OrderEntity> {
		const { id } = params;
		const res = await this.orderRepository.findById(id);
		if ( !res ) throw new NotFoundException('ORDER_NOT_FOUND');
		return res;
	}

	async findAll(params: { page?: number, itemsPerPage?: number, status?: OrderStatus }): Promise<PaginatedResults<OrderEntity>> {
		const page = params.page || 1;
		const itemsPerPage = params.itemsPerPage || 20;

		const take = itemsPerPage;
		const skip = (page - 1) * itemsPerPage;

		const itemsAndCount = await this.orderRepository.findPaginated(take, skip, {
			status: params.status,
		});
		return {
			totalCount: itemsAndCount[1],
			items: itemsAndCount[0],
			pageSize: itemsPerPage,
			pageNumber: page,
		};
	}

	async findOfUser(userId: number) {
		return this.orderRepository.findOfUser(userId);
	}

	async update(params: { id: number, updateOrderDto: UpdateOrderDto }): Promise<OrderEntity> {
		const { id, updateOrderDto } = params;
		await this.orderRepository.update(id, updateOrderDto);
		return this.findOne({ id });
	}

	async updateStatus(params: { id: number, updateOrderStatusDto: UpdateOrderStatusDto }): Promise<OrderEntity> {
		const { id, updateOrderStatusDto } = params;
		await this.orderRepository.update(id, {
			status: OrderStatus[updateOrderStatusDto.status],
		});
		const order = await this.findOne({ id });
		let statusEvent: OrderEventsEnum;
		switch ( updateOrderStatusDto.status ) {
			case OrderStatus.FULFILLED:
				statusEvent = OrderEventsEnum.FULFILLMENT_FULFILLED_ITEMS;
				await CommerceOrderEventClient.orderCompleted(this.eventEmitter, { order: order, notifyCustomer: updateOrderStatusDto.notifyCustomer });
				break;
			case  OrderStatus.CANCELED:
				statusEvent = OrderEventsEnum.CANCELED;
				await this.returnProductVariantStock(order.lines);
				await CommerceOrderEventClient.orderCancelled(this.eventEmitter, { order: order, notifyCustomer: updateOrderStatusDto.notifyCustomer });
				break;
			case  OrderStatus.RETURNED:
				statusEvent = OrderEventsEnum.FULFILLMENT_RETURNED;
				break;
			case  OrderStatus.UNCONFIRMED:
				break;
			case OrderStatus.ON_HOLD:
				statusEvent = OrderEventsEnum.ON_HOLD;
				await CommerceOrderEventClient.orderOnHold(this.eventEmitter, { order: order, notifyCustomer: updateOrderStatusDto.notifyCustomer });
		}
		if ( statusEvent ) {
			await this.orderEventRepository.save({
				order: order,
				eventType: statusEvent,
				parameters: {},
			});
		}
		return order;
	}

	async updatePaymentStatus(params: { id: number, updatePaymentStatusDto: UpdatePaymentStatusDto, notifyCustomer?: boolean }) {
		const { id, updatePaymentStatusDto, notifyCustomer } = params;
		const order = await this.findOne({ id: id });
		const { payment } = order;
		let statusEvent: OrderEventsEnum;

		await this.paymentService.patch({ id: payment.id, dto: updatePaymentStatusDto });

		switch ( updatePaymentStatusDto.status ) {
			case PaymentStatus.CANCELED:
			case PaymentStatus.ERROR:
			case PaymentStatus.REFUSED:
				statusEvent = OrderEventsEnum.PAYMENT_FAILED;
				await CommerceOrderEventClient.orderFailed(this.eventEmitter, { order: order });
				if ( order.status !== OrderStatus.CANCELED ) {
					await this.updateStatus({ id: id, updateOrderStatusDto: { status: OrderStatus.CANCELED, notifyCustomer: false } });
				}
				break;
			case PaymentStatus.PENDING:
				await CommerceOrderEventClient.orderPaymentPending(this.eventEmitter, { order: order, notifyCustomer: notifyCustomer });
				break;
			case PaymentStatus.CAPTURED:
				statusEvent = OrderEventsEnum.PAYMENT_CAPTURED;
				break;
			case PaymentStatus.PROCESSING:
				await CommerceOrderEventClient.orderCreated(this.eventEmitter, { order: order, notifyCustomer: notifyCustomer });
				break;
			case PaymentStatus.AUTHORIZED:
				statusEvent = OrderEventsEnum.PAYMENT_AUTHORIZED;
				break;
		}
		if ( statusEvent ) {
			await this.orderEventRepository.save({
				order: order,
				eventType: statusEvent,
				parameters: {},
			});
		}

		return this.findOne({ id: id });
	}

	async remove(params: { id: number }): Promise<OrderEntity> {
		const { id } = params;
		const res = await this.findOne({ id });
		await this.orderRepository.deleteById(id);
		return res;
	}

	private async returnProductVariantStock(orderLines: OrderLineDto[]): Promise<void> {
		const returnStockPromises = orderLines.map((item) => this.variantService.returnStock({ productVariantId: item.id, stock: item.quantity }));
		await Promise.all(returnStockPromises);
	}
}

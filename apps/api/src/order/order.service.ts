import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CheckoutService } from '../checkout/checkout.service';
import { ProductVariantService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import { ShippingService } from '../shipping/shipping.service';
import { InternalCreateOrderLineDto } from './dto/order-line.dto';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderEventsEnum, OrderStatus } from './dto/order.enum';
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
		private checkoutService: CheckoutService,
		private shippingService: ShippingService,
		private productService: ProductsService,
		private variantService: ProductVariantService,
	) {
	}

	async create(params: { createOrderDto: CreateOrderDto }): Promise<OrderEntity> {
		const { createOrderDto } = params;
		const res = await this.orderRepository.insert(createOrderDto);
		return this.findOne(res.identifiers[0].id);
	}

	async createFromCheckout(params: { token: string }) {
		const checkoutDto = await this.checkoutService.getDto(params.token);
		if ( !checkoutDto.shippingMethod ) throw new BadRequestException('CHECKOUT_NO_SELECTED_SHIPPING_METHOD');
		const shippingMethod = await this.shippingService.getById({ id: checkoutDto.shippingMethod.id });

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
			status: OrderStatus.DRAFT,
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
		};

		const order = await this.orderRepository.save(dto);

		await this.orderEventRepository.save({
			order: order,
			eventType: OrderEventsEnum.DRAFT_CREATED,
			parameters: {},
		});

		for ( const line of checkoutDto.lines ) {
			const product = await this.productService.getById({ id: line.productId });
			const variant = await this.variantService.getById({ id: line.variantId });
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
				saleId: '',
				voucherCode: checkoutDto.voucherCode,
				unitDiscountAmount: 0,
				unitDiscountReason: '',
				unitDiscountType: '',
				unitDiscountValue: 0,

				/*Tax Rate handling not implemented yet*/
				taxRate: 0,

				/*Quantity Cost*/
				isShippingRequired: product.productType.isDigital,
				totalPriceGrossAmount: line.totalCost,
				totalPriceNetAmount: 0,
				undiscountedTotalPriceGrossAmount: line.totalCost,
				undiscountedTotalPriceNetAmount: 0,

				/*Unit Costs*/
				unitPriceGrossAmount: 0,
				unitPriceNetAmount: 0,
				undiscountedUnitPriceGrossAmount: variant.priceAmount || 0,
				undiscountedUnitPriceNetAmount: 0,
			};
			await this.orderLineRepository.insert(dto);
		}

		await this.orderEventRepository.save({
			order: order,
			eventType: OrderEventsEnum.ADDED_PRODUCTS,
			parameters: {},
		});

		return this.findOne({ id: order.id });
	}

	async findOne(params: { id: number }): Promise<OrderEntity> {
		const { id } = params;
		const res = await this.orderRepository.findById(id);
		if ( !res ) throw new NotFoundException('ORDER_NOT_FOUND');
		return res;
	}

	findAll() {
		return `This action returns all order`;
	}

	async update(params: { id: number, updateOrderDto: UpdateOrderDto }): Promise<OrderEntity> {
		const { id, updateOrderDto } = params;
		await this.orderRepository.update(id, updateOrderDto);
		return this.findOne({ id });
	}

	async remove(params: { id: number }): Promise<OrderEntity> {
		const { id } = params;
		const res = await this.findOne({ id });
		await this.orderRepository.deleteById(id);
		return res;
	}
}

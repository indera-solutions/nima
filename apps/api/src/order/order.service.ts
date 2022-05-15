import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckoutService } from '../checkout/checkout.service';
import { CheckoutLineEntity } from '../checkout/entities/checkout-line.entity';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderStatus } from './dto/order.enum';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from './entities/order.repository';

@Injectable()
export class OrderService {

	constructor(
		private orderRepository: OrderRepository,
		private checkoutService: CheckoutService,
	) {
	}

	async create(params: { createOrderDto: CreateOrderDto }): Promise<OrderEntity> {
		const { createOrderDto } = params;
		const res = await this.orderRepository.insert(createOrderDto);
		return this.findOne(res.identifiers[0].id);
	}

	async createFromCheckout(params: { token: string }) {
		const co = await this.checkoutService.findOne({ token: params.token });
		const dto: CreateOrderDto = {
			languageCode: co.languageCode,
			currency: co.currency,
			privateMetadata: co.privateMetadata,
			metadata: co.metadata,
			redirectUrl: co.redirectUrl,
			user: co.user,
			billingAddress: co.billingAddress,
			checkoutToken: co.token,
			customerNote: co.note,
			userEmail: co.email,
			status: OrderStatus.DRAFT,
			shippingAddress: co.shippingAddress,
			weight: 0,

			displayGrossPrices: true,
			origin: '',
			original: undefined,

			shippingMethodId: 0,
			shippingMethodName: '',
			shippingPriceGrossAmount: 0,
			shippingPriceNetAmount: 0,
			shippingTaxRate: 0,
			trackingClientId: '0',

			totalGrossAmount: 0,
			totalNetAmount: 0,
			totalPaidAmount: 0,
			undiscountedTotalGrossAmount: 0,
			undiscountedTotalNetAmount: 0,
		};
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

	private async calculateCosts(lines: CheckoutLineEntity[]) {
		const res = {
			gross: 0,
			net: 0,
			undiscountedGross: 0,
			undiscountedNet: 0,
			weight: 0,
		};
		for ( const line of lines ) {
			res.net += line.variant.priceAmount;
		}
	}
}

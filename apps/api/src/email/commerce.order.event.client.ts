import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from '../events';
import { OrderEntity } from '../order/entities/order.entity';
import { ProductVariantEntity } from '../products/entities/product-variant.entity';

export class CommerceOrderEventClient {

	static async orderCreated(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_CREATED, payload);
	}

	static async orderFailed(eventEmitter: EventEmitter2, payload: { order: OrderEntity }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_FAILED, payload);
	}

	static async orderCancelled(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_CANCELLED, payload);
	}

	static async orderShipped(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_SHIPPED, payload);
	}

	static async orderRefunded(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_REFUNDED, payload);
	}

	static async orderCompleted(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_COMPLETED, payload);
	}

	static async orderOnHold(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_ON_HOLD, payload);
	}

	static async orderPaymentPending(eventEmitter: EventEmitter2, payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		return eventEmitter.emit(Events.COMMERCE.ORDER_PAYMENT_PENDING, payload);
	}

	static async lowStockAlert(eventEmitter: EventEmitter2, payload: { variants: ProductVariantEntity[] }) {
		return eventEmitter.emit(Events.COMMERCE.LOW_STOCK, payload);
	}
}

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SettingsService } from '../../core/settings/settings.service';
import { Events } from '../../events';
import { OrderEntity } from '../../order/entities/order.entity';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { EmailService } from '../email.service';
import { Emails } from '../templates';
import { NimaEmail } from '../templates/BaseEmail';
import {
	CommerceEmailOrderDetails,
	LowStockAdminEmail,
	LowStockAdminEmailTemplateOptions,
	OrderCanceledEmail,
	OrderCompletedEmail,
	OrderCreatedAdminEmail,
	OrderFailedAdminEmail,
	OrderOnHoldEmail,
	OrderPaymentPendingAdminEmail,
	OrderPaymentPendingEmail,
	OrderProcessingEmail,
	OrderRefundedEmail,
	OrderShippedEmail,
} from '../templates/commerce';

@Injectable()
export class EmailCommerceListener {
	constructor(
		private service: EmailService,
		private settingsService: SettingsService,
	) {
	}

	@OnEvent(Events.COMMERCE.ORDER_CREATED)
	async orderCreated(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;
		const settings = await this.settingsService.getSettings();

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_PROCESSING, payload, settings);
			if ( !template ) template = (new OrderProcessingEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CREATED_ADMIN, payload, settings);
		if ( !adminTemplate ) adminTemplate = (new OrderCreatedAdminEmail()).getTemplate(settings.adminLanguage, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(adminTemplate);
	}

	@OnEvent(Events.COMMERCE.ORDER_FAILED)
	async orderFailed(payload: { order: OrderEntity }) {
		const { order } = payload;
		const settings = await this.settingsService.getSettings();

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_FAILED, payload, settings);
		if ( !template ) template = (new OrderFailedAdminEmail()).getTemplate(settings.adminLanguage, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(template);
	}

	@OnEvent(Events.COMMERCE.ORDER_CANCELLED)
	async orderCancelled(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;
		const settings = await this.settingsService.getSettings();

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED, payload, settings);
			if ( !template ) template = (new OrderCanceledEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED_ADMIN, payload, settings);
		if ( !adminTemplate ) adminTemplate = (new OrderFailedAdminEmail()).getTemplate(settings.adminLanguage, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(adminTemplate);
	}

	@OnEvent(Events.COMMERCE.ORDER_SHIPPED)
	async orderShipped(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;
		const settings = await this.settingsService.getSettings();

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_SHIPPED, payload, settings);
			if ( !template ) template = (new OrderShippedEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}
	}


	@OnEvent(Events.COMMERCE.ORDER_REFUNDED)
	async orderRefunded(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_REFUNDED, payload);
			if ( !template ) template = (new OrderRefundedEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}
	}

	@OnEvent(Events.COMMERCE.ORDER_COMPLETED)
	async orderCompleted(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_COMPLETED, payload);
			if ( !template ) template = (new OrderCompletedEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}
	}

	@OnEvent(Events.COMMERCE.ORDER_ON_HOLD)
	async orderOnHold(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_ON_HOLD, payload);
			if ( !template ) template = (new OrderOnHoldEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}
	}

	@OnEvent(Events.COMMERCE.ORDER_PAYMENT_PENDING)
	async orderPaymentPending(payload: { order: OrderEntity, notifyCustomer?: boolean }) {
		const { order, notifyCustomer } = payload;
		const settings = await this.settingsService.getSettings();

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
		};

		if ( notifyCustomer ) {
			let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED, payload, settings);
			if ( !template ) template = (new OrderPaymentPendingEmail()).getTemplate(order.languageCode, { orderDetails: orderDetails });
			await this.service.sendEmail(template, order.userEmail);
		}

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED_ADMIN, payload);
		if ( !adminTemplate ) adminTemplate = (new OrderPaymentPendingAdminEmail()).getTemplate(settings.adminLanguage, { orderDetails: orderDetails, orderNumber: order.id });
		await this.service.sendAdminEmail(adminTemplate);
	}

	@OnEvent(Events.COMMERCE.LOW_STOCK)
	async onLowStock(payload: { variants: ProductVariantEntity[] }) {
		const { variants } = payload;
		const settings = await this.settingsService.getSettings();
		const orderDetails: LowStockAdminEmailTemplateOptions = {
			products: variants.map(v => ({
				name: v.name,
				stock: v.stock,
				sku: v.sku,
			})),
		};

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.LOW_STOCK_ADMIN, payload);
		if ( !adminTemplate ) adminTemplate = (new LowStockAdminEmail()).getTemplate(settings.adminLanguage, orderDetails);
		await this.service.sendAdminEmail(adminTemplate);
	}
}

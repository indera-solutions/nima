import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LanguageCode } from '@nima-cms/utils';
import { Events } from '../../events';
import { OrderEntity } from '../../order/entities/order.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { EmailService } from '../email.service';
import { Emails } from '../templates';
import { NimaEmail } from '../templates/BaseEmail';
import {
	CommerceEmailOrderDetails,
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
	) {
	}

	@OnEvent(Events.COMMERCE.ORDER_CREATED)
	async newOrder(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_PROCESSING, payload);
		if ( !template ) template = (new OrderProcessingEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CREATED_ADMIN, payload);
		if ( !adminTemplate ) adminTemplate = (new OrderCreatedAdminEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(adminTemplate);
	}

	@OnEvent(Events.COMMERCE.ORDER_FAILED)
	async orderFailed(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_FAILED, payload);
		if ( !template ) template = (new OrderFailedAdminEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(template);
	}

	@OnEvent(Events.COMMERCE.ORDER_CANCELLED)
	async orderCancelled(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED, payload);
		if ( !template ) template = (new OrderCanceledEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED_ADMIN, payload);
		if ( !adminTemplate ) adminTemplate = (new OrderFailedAdminEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendAdminEmail(adminTemplate);
	}

	@OnEvent(Events.COMMERCE.ORDER_SHIPPED)
	async orderShipped(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_SHIPPED, payload);
		if ( !template ) template = (new OrderShippedEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);
	}


	@OnEvent(Events.COMMERCE.ORDER_REFUNDED)
	async orderRefunded(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_REFUNDED, payload);
		if ( !template ) template = (new OrderRefundedEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);
	}

	@OnEvent(Events.COMMERCE.ORDER_COMPLETED)
	async orderCompleted(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_COMPLETED, payload);
		if ( !template ) template = (new OrderCompletedEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);
	}

	@OnEvent(Events.COMMERCE.ORDER_ON_HOLD)
	async orderOnHold(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_ON_HOLD, payload);
		if ( !template ) template = (new OrderOnHoldEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);
	}

	@OnEvent(Events.COMMERCE.ORDER_PAYMENT_PENDING)
	async orderPaymentPending(payload: { user: UserEntity, order: OrderEntity, language: LanguageCode }) {
		const { order, user, language } = payload;

		const orderDetails: CommerceEmailOrderDetails = {
			order: order,
			user: user,
		};

		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED, payload);
		if ( !template ) template = (new OrderPaymentPendingEmail()).getTemplate(language, { orderDetails: orderDetails });
		await this.service.sendEmail(template, user.email);

		let adminTemplate: NimaEmail = await this.service.getWebhookTemplate(Emails.ORDER_CANCELED_ADMIN, payload);
		if ( !adminTemplate ) adminTemplate = (new OrderPaymentPendingAdminEmail()).getTemplate(language, { orderDetails: orderDetails, orderNumber: order.id });
		await this.service.sendAdminEmail(adminTemplate);
	}
}

import { LanguageCode } from '@nima-cms/utils';
import { BaseAdminEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderPaymentPendingAdminEmailTemplateOptions extends BaseAdminEmailParams {
	orderNumber: number;
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderPaymentPendingAdminEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderPaymentPendingAdminEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order Payment Pending',
				[LanguageCode.el]: 'Παραγγελία σε αναμονή πληρωμής',
			},
			mainText: {
				[LanguageCode.el]: `Η παραγγελία με αριθμό ${ params.orderDetails.order.id } είναι σε αναμονή πληρωμής.`,
				[LanguageCode.en]: `The order with number ${ params.orderDetails.order.id } is on hold waiting for payment.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία με αριθμό ${ params.orderDetails.order.id } είναι σε αναμονή πληρωμής.`,
				[LanguageCode.en]: `The order with number ${ params.orderDetails.order.id } is on hold waiting for payment.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: {},
		});
	}
}

import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderPaymentPendingEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderPaymentPendingEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderPaymentPendingEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order Payment Pending',
				[LanguageCode.el]: 'Παραγγελίας σε αναμονή πληρωμής',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ params.orderDetails.user.firstName },
Your order with number #${ params.orderDetails.order.id } is on hold waiting for payment.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ params.orderDetails.user.firstName },
Η παραγγελία σου  με αριθμό #${ params.orderDetails.order.id } είναι σε αναμονή πληρωμής.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } είναι σε αναμονή πληρωμής.`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } is on hold waiting for payment.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
		});
	}
}

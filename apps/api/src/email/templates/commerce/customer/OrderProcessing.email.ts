import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderProcessingEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderProcessingEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderProcessingEmailTemplateOptions): NimaEmail {
		const firstName = BaseCommerceEmail.getOrderUserFirstName(params.orderDetails.order);
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order processing',
				[LanguageCode.el]: 'Παραγγελίας σε εξέλιξη',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ firstName },
Your order with number #${ params.orderDetails.order.id } is processing.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ firstName },
Η παραγγελία σου με αριθμό #${ params.orderDetails.order.id } είναι σε εξέλιξη.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } είναι σε εξέλιξη.`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } is processing.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: params,

		});
	}
}



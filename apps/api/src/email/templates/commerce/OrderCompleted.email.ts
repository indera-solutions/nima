import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from './BaseCommerceEmail';

export interface OrderCompletedEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderCompletedEmail extends BaseCommerceEmail {

	getTemplate(language: LanguageCode, params: OrderCompletedEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order completed',
				[LanguageCode.el]: 'Ολοκλήρωση Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ params.orderDetails.user.firstName },
Your order with number #${ params.orderDetails.order.id } has been completed.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ params.orderDetails.user.firstName },
Η παραγγελία σου με αριθμό #${ params.orderDetails.order.id } έχει ολοκληρωθεί`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } ολοκληρωθεί`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } has been completed`,
			},
			locale: language,
			orderDetails: params.orderDetails,
		});
	}
}

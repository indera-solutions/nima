import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderShippedEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderShippedEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderShippedEmailTemplateOptions): NimaEmail {
		const firstName = BaseCommerceEmail.getOrderUserFirstName(params.orderDetails.order);
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order shipped',
				[LanguageCode.el]: 'Παραγγελία Προς Αποστολή',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ firstName },
Your order with number #${ params.orderDetails.order.id } has been shipped.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ firstName },
Η παραγγελία σου με αριθμό #${ params.orderDetails.order.id } έχει αποστάλει.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } έχει αποστάλει.`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } has been shipped.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
		});
	}
}

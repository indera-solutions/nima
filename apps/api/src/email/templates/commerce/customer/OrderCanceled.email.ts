import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderCanceledEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderCanceledEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderCanceledEmailTemplateOptions): NimaEmail {
		const firstName = BaseCommerceEmail.getOrderUserFirstName(params.orderDetails.order);
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order canceled',
				[LanguageCode.el]: 'Ακύρωση Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ firstName },
Your order with number #${ params.orderDetails.order.id } has been canceled.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ firstName },
Η παραγγελία σου με αριθμό #${ params.orderDetails.order.id } έχει ακυρωθεί`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό #${ params.orderDetails.order.id } έχει ακυρωθεί`,
				[LanguageCode.en]: `Your order with number #${ params.orderDetails.order.id } has been cancel`,
			},
			locale: language,
			orderDetails: params.orderDetails,

		});
	}
}

import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderRefundedEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderRefundedEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderRefundedEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order refunded',
				[LanguageCode.el]: 'Επιστροφή Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ params.orderDetails.user.firstName },
Your order with number #${ params.orderDetails.order.id }  has been refunded.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ params.orderDetails.user.firstName },
Η παραγγελία σου με αριθμό #${ params.orderDetails.order.id } έχει επιστραφεί.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } έχει επιστραφεί.`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } has been refunded.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
		});
	}
}



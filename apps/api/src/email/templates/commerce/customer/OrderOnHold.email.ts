import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderOnHoldEmailTemplateOptions extends BaseEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderOnHoldEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderOnHoldEmailTemplateOptions): NimaEmail {
		const firstName = BaseCommerceEmail.getOrderUserFirstName(params.orderDetails.order);
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order on hold',
				[LanguageCode.el]: 'Παραγγελίας σε αναμονή',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ firstName },
Your order with number #${ params.orderDetails.order.id } is on hold.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ firstName },
Η παραγγελία σου  με αριθμό #${ params.orderDetails.order.id } είναι σε αναμονή.`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό ${ params.orderDetails.order.id } είναι σε αναμονή.`,
				[LanguageCode.en]: `Your order with number ${ params.orderDetails.order.id } is on hold.`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: params,

		});
	}
}



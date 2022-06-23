import { LanguageCode } from '@nima-cms/utils';
import { BaseAdminEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderCanceledAdminEmailTemplateOptions extends BaseAdminEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderCanceledAdminEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderCanceledAdminEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order canceled',
				[LanguageCode.el]: 'Ακύρωση Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`The order with number #${ params.orderDetails.order.id } has been canceled.
				`,
				[LanguageCode.el]:
					`Η παραγγελία με αριθμό #${ params.orderDetails.order.id } έχει ακυρωθεί`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία με αριθμό #${ params.orderDetails.order.id } έχει ακυρωθεί`,
				[LanguageCode.en]: `The order with number #${ params.orderDetails.order.id } has been cancel`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: {},

		});
	}
}

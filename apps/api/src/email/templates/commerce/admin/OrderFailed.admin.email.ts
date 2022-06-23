import { LanguageCode } from '@nima-cms/utils';
import { BaseAdminEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderFailedAdminEmailTemplateOptions extends BaseAdminEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderFailedAdminEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderFailedAdminEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order Failed',
				[LanguageCode.el]: 'Σφάλμα Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`Order with number #${ params.orderDetails.order.id } has failed.`,
				[LanguageCode.el]:
					`Η παραγγελία με αριθμό #${ params.orderDetails.order.id } παρουσίασε σφάλμα`,
			},
			subject: {
				[LanguageCode.en]:
					`Order with number #${ params.orderDetails.order.id } has failed.`,
				[LanguageCode.el]:
					`Η παραγγελία με αριθμό #${ params.orderDetails.order.id } παρουσίασε σφάλμα`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: {},

		});
	}
}

import { LanguageCode } from '@nima-cms/utils';
import { BaseAdminEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderCreatedAdminEmailTemplateOptions extends BaseAdminEmailParams {
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderCreatedAdminEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderCreatedAdminEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'New Order',
				[LanguageCode.el]: 'Νέα Παραγγελία',
			},
			mainText: {
				[LanguageCode.en]: `New Order with number #${ params.orderDetails.order.id } has been created.`,
				[LanguageCode.el]: `Νέα Παραγγελία με αριθμό #${ params.orderDetails.order.id } έχει δημιουργηθεί`,
			},
			subject: {
				[LanguageCode.en]: `New Order with number #${ params.orderDetails.order.id } has been created.`,
				[LanguageCode.el]: `Νέα Παραγγελία με αριθμό #${ params.orderDetails.order.id } έχει δημιουργηθεί`,
			},
			locale: language,
			orderDetails: params.orderDetails,
			params: {},

		});

	}
}

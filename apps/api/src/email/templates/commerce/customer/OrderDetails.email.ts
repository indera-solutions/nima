import { LanguageCode } from '@nima-cms/utils';
import { UserEntity } from '../../../../users/entities/user.entity';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail, CommerceEmailOrderDetails } from '../BaseCommerceEmail';

export interface OrderDetailsEmailTemplateOptions extends BaseEmailParams {
	companyName: string;
	orderNumber: number;
	customer: UserEntity;
	orderDetails: CommerceEmailOrderDetails;
}

export class OrderDetailsEmail extends BaseCommerceEmail {
	getTemplate(language: LanguageCode, params: OrderDetailsEmailTemplateOptions): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: 'Order canceled',
				[LanguageCode.el]: 'Ακύρωση Παραγγελίας',
			},
			mainText: {
				[LanguageCode.en]:
					`Dear ${ params.orderDetails.user.firstName },
Your order with number #${ params.orderDetails.order.id } has been canceled.`,
				[LanguageCode.el]:
					`Αγαπητέ ${ params.orderDetails.user.firstName },
Η παραγγελία σου  με αριθμό #${ params.orderDetails.order.id } έχει ακυρωθεί`,
			},
			subject: {
				[LanguageCode.el]: `Η παραγγελία σας με αριθμό #${ params.orderDetails.order.id } ακυρωθεί`,
				[LanguageCode.en]: `Your order with number #${ params.orderDetails.order.id } has been cancel`,
			},
			locale: language,
			orderDetails: params.orderDetails,
		});
	}
}

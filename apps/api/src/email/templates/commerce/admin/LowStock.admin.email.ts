import { LanguageCode } from '@nima-cms/utils';
import { ProductVariantEntity } from '../../../../products/entities/product-variant.entity';
import { BaseAdminEmailParams, NimaEmail } from '../../BaseEmail';
import { BaseCommerceEmail } from '../BaseCommerceEmail';

export interface LowStockAdminEmailTemplateOptions extends BaseAdminEmailParams {
	products: Pick<ProductVariantEntity, 'name' | 'stock' | 'sku'>[];
}

export class LowStockAdminEmail extends BaseCommerceEmail {
	constructor() {
		super();
	}

	getTemplate(language: LanguageCode, params: LowStockAdminEmailTemplateOptions): NimaEmail {
		const prodText: string = params.products.map(item => {
			return `- ${ item.name[language] } (${ item.sku }) x ${ item.stock }`;
		}).join('\n');

		return {
			subject: `Low Stock`,
			body: `The following products are on low stock.\n\nCurrent Stocks:\n\n${ prodText }`,
		};
	}
}

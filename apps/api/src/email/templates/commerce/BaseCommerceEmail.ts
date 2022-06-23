import {
	countries,
	getCountryName,
	getEuroValue,
	getStateName,
	LanguageCode,
	states,
	toTitleCase,
	Translatable,
} from '@nima-cms/utils';
import { OrderEntity } from '../../../order/entities/order.entity';
import { BaseEmail, BaseEmailParams, NimaEmail } from '../BaseEmail';
import { commerceEmailStrings } from './commerceEmailStrings';


const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

export interface CommerceEmailOrderDetails {
	order: OrderEntity;
}


export abstract class BaseCommerceEmail extends BaseEmail {


	static getOrderUserFirstName(order: OrderEntity): string {
		return order.user?.firstName || order.billingAddress?.firstName || order.shippingAddress?.firstName || 'Customer';
	}

	protected getString(key: keyof typeof commerceEmailStrings, locale: LanguageCode) {
		const temp = commerceEmailStrings[key][locale];
		if ( !temp ) return commerceEmailStrings[key]['en'];
		return temp;
	}

	protected getLayout(title: string, maintext: string, details: string, params: { locale: LanguageCode, siteLogoUrl?: string }): string {
		const { locale, siteLogoUrl } = params;
		if ( !siteLogoUrl ) throw new Error('no logo');
		return `
		<mjml>
   <mj-body>
    ${ siteLogoUrl ? `<mj-section background-color='#000' padding=0>
      <mj-column>
        <mj-image src="${ siteLogoUrl }" container-background-color="#000">
        </mj-image>
      </mj-column>
    </mj-section>` : '' }

     <mj-section background-color='#000'>
        <mj-column>
			<mj-text color='white' align='center' padding='20px'>
				<h1>${ title }</h1>
			</mj-text>
		</mj-column>
     </mj-section>
     <mj-section border-right='1px solid #eee' border-left='1px solid #eee'>
       <mj-column>
         <mj-text color='black' align='center' padding='20px'>
           <p>
             ${ maintext }
           </p>
         </mj-text>
       </mj-column>
     </mj-section>
        ${ details ? `
        <mj-section border-right='1px solid #eee' border-left='1px solid #eee'>
            ${ details }
        </mj-section>
        ` : '' }

	     <mj-section border='1px solid #eee'>
	       <mj-column>
	         <mj-text align='center'>
	           ${ this.getString('THANK_YOU', locale) }
	         </mj-text>
	       </mj-column>
	     </mj-section>
	   </mj-body>
	 </mjml>
		`;
	}

	protected getOrderDetails(locale: LanguageCode, details: CommerceEmailOrderDetails): string {
		const { order } = details;
		if ( !order || !order.lines || !order.payment ) throw new Error('MISSING_FIELD');
		return `
       <mj-column>
         <mj-table>
            <tr style='text-align:left'>
             <th  style='text-align:left'><h2> ${ this.getString('ORDER', locale) } #${ order.id }</h2></th>
             <th></th>
             <th  style='text-align:right'><h2>${ dayjs(order.created).tz('Europe/Athens').format('DD-MM-YYYY HH:mm') }</h2></th>
           </tr>
           <tr style='border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;'>
             <th style='word-break: keep-all;padding:0 5px'> ${ this.getString('PRODUCT', locale) }</th>
             <th style='word-break: keep-all;padding:0 5px'> ${ this.getString('QUANTITY', locale) }</th>
             <th style='word-break: keep-all;padding:0 5px'> ${ this.getString('PRICE', locale) }</th>
           </tr>
           ${ order.lines.map(item => `
           <tr>
             <td>${ item.productName[locale] || item.productName['en'] }</td>
             <td>${ item.quantity }</td>
             <td>${ getEuroValue(item.totalPriceGrossAmount) }</td>
           </tr>
           `).join('') }
           <tr>
             <td colspan='2'>${ this.getString('SUBTOTAL', locale) }:</td>
             <td>${ getEuroValue(order.undiscountedTotalGrossAmount) }</td>
           </tr>
           <tr>
             <td colspan='2'>${ this.getString('SHIPPING_COST', locale) }:</td>
             <td>${ getEuroValue(order.shippingPriceGrossAmount || 0) }</td>
           </tr>
            <tr>
             <td colspan='2'>${ this.getString('DISCOUNT', locale) }:</td>
             <td>${ getEuroValue(order.totalGrossAmount - order.shippingPriceGrossAmount - order.undiscountedTotalGrossAmount) }</td>
           </tr>
            <tr>
             <td colspan='2'>${ this.getString('PAYMENT_METHOD', locale) }:</td>
             <td>${ toTitleCase(order.payment.method) }</td>
           </tr>
           <tr>
             <td colspan='2'>${ this.getString('TOTAL', locale) }:</td>
             <td>${ getEuroValue(order.totalGrossAmount) }</td>
           </tr>
         </mj-table>
       </mj-column>
     </mj-section>

     <mj-section border-right='1px solid #eee' border-left='1px solid #eee'>
       <mj-group>
         <mj-column>
           <mj-text color='black' align='center' padding='20px'>
             <h3>${ this.getString('BILLING_ADDRESS', locale) }</h3>
             <ul style='list-style: none; text-align:left' >
               <li> ${ order.billingAddress?.firstName } ${ order.billingAddress?.lastName } </li>
               <li> ${ order.billingAddress?.address }</li>
               <li> ${ order.billingAddress?.zip }</li>
               <li> ${ getStateName(states[order.billingAddress?.country || 'GR'][order.billingAddress?.state || ''], locale) }</li>
               <li> ${ getCountryName(countries[order.billingAddress?.country || 'GR']) } </li>
               <li> ${ order.billingAddress.phone }</li>
               <li> ${ order.userEmail }</li>
             </ul>
           </mj-text>
         </mj-column>
         <mj-column>
           <mj-text color='black' align='center' padding='20px'>

             <h3> ${ this.getString('SHIPPING_ADDRESS', locale) }</h3>
                <ul style='list-style: none; text-align:left' >
               <li> ${ order.shippingAddress?.firstName } ${ order.shippingAddress?.lastName } </li>
               <li> ${ order.shippingAddress?.address }</li>
               <li> ${ order.shippingAddress?.zip }</li>
                <li> ${ getStateName(states[order.shippingAddress?.country || 'GR'][order.shippingAddress?.state || ''], locale) }</li>
               <li> ${ getCountryName(countries[order.shippingAddress?.country || 'GR']) } </li>
             </ul>
           </mj-text>
         </mj-column>

       </mj-group>
		`;
	}

	protected customerEmailWithDetails(params: {
		title: Translatable,
		mainText: Translatable,
		subject: Translatable;
		orderDetails: CommerceEmailOrderDetails,
		locale: LanguageCode,
		params: BaseEmailParams,
	}): NimaEmail {
		const details = this.getOrderDetails(params.locale, params.orderDetails);

		const html = super.compileTemplateToHTML(
			this.getLayout(
				params.title[params.locale] || '',
				params.mainText[params.locale] || '',
				details,
				{
					locale: params.locale,
					siteLogoUrl: params.params.siteLogoUrl,
				},
			),
		);
		return {
			subject: params.subject[params.locale] || '',
			body: params.mainText[params.locale] || '',
			html,
		};
	}
}

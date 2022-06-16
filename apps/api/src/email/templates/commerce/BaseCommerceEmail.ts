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
import { BaseEmail, NimaEmail } from '../BaseEmail';


const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

export interface CommerceEmailOrderDetails {
	order: OrderEntity;
}

export abstract class BaseCommerceEmail extends BaseEmail {
	protected getLayout(title: string, maintext: string, details: string): string {
		return `
		<mjml>
   <mj-body>
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
	           Σας ευχαριστούμε που χρησιμοποιείτε τον ιστότοπο μας
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
             <th  style='text-align:left'><h2>Παραγγελία #${ order.id }</h2></th>
             <th></th>
             <th  style='text-align:right'><h2>${ dayjs(order.created).tz('Europe/Athens').format('DD-MM-YYYY HH:mm') }</h2></th>
           </tr>
           <tr style='border-bottom:1px solid #ecedee;text-align:left;padding:15px 0;'>
             <th>Προϊόν</th>
             <th>Ποσότητα</th>
             <th>Τιμή</th>
           </tr>
           ${ order.lines.map(item => `
           <tr>
             <td>${ item.productName[locale] }</td>
             <td>${ item.quantity }</td>
             <td>${ getEuroValue(item.totalPriceGrossAmount) }</td>
           </tr>
           `).join('') }
           <tr>
             <td colspan='2'>Υποσύνολο:</td>
             <td>${ getEuroValue(order.totalGrossAmount - (order.shippingPriceGrossAmount || 0) - (0 /* add additional conts here*/)) }</td>
           </tr>
            <tr>
             <td colspan='2'>Τροπος πληρωμής:</td>
             <td>${ toTitleCase(order.payment.method) }</td>
           </tr>
           <tr>
             <td colspan='2'>Σύνολο:</td>
             <td>${ getEuroValue(order.totalGrossAmount) }</td>
           </tr>
         </mj-table>
       </mj-column>
     </mj-section>

     <mj-section border-right='1px solid #eee' border-left='1px solid #eee'>
       <mj-group>
         <mj-column>
           <mj-text color='black' align='center' padding='20px'>
             <h3>Διεύθυνση χρέωσης</h3>
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

             <h3> Διεύθυνση αποστολής</h3>
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
		locale: LanguageCode
	}): NimaEmail {
		const details = this.getOrderDetails(params.locale, params.orderDetails);
		const html = super.compileTemplateToHTML(this.getLayout(params.title[params.locale] || '', params.mainText[params.locale] || '', details));
		return {
			subject: params.subject[params.locale] || '',
			body: params.mainText[params.locale] || '',
			html,
		};
	}
}

import { LanguageCode, Translatable } from '@nima-cms/utils';
import { AuthActionEntity } from '../../../auth/entities/AuthAction.entity';
import { UserEntity } from '../../../users/entities/user.entity';
import { BaseEmail, NimaEmail } from '../BaseEmail';


const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);
dayjs.extend(timezone);

export interface AuthEmailDetails {
	user: UserEntity;
	authAction: AuthActionEntity;
}

export abstract class BaseAuthEmail extends BaseEmail {
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

	protected customerEmailWithDetails(params: {
		title: Translatable,
		mainText: Translatable,
		subject: Translatable;
		authDetails: AuthEmailDetails,
		locale: LanguageCode
	}): NimaEmail {
		const details = this.getAuthDetails(params.locale, params.authDetails);
		const html = super.compileTemplateToHTML(this.getLayout(params.title[params.locale] || '', params.mainText[params.locale] || '', details));
		return {
			subject: params.subject[params.locale] || '',
			body: params.mainText[params.locale] || '',
			html,
		};
	}

	protected getAuthDetails(locale: LanguageCode, authDetails: AuthEmailDetails) {
		const { authAction, user } = authDetails;
		if ( !authAction || !user ) throw new Error('MISSING_FIELD');
		return `

		`;
	}
}

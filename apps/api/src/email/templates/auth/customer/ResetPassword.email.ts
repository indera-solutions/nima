import { LanguageCode } from '@nima-cms/utils';
import { BaseEmailParams, NimaEmail } from '../../BaseEmail';
import { AuthEmailDetails, BaseAuthEmail } from '../BaseAuthEmail';

export interface ResetPasswordEmailParams extends BaseEmailParams {
	authDetails: AuthEmailDetails;
	siteName: string;
	link: string;
}

export class ResetPasswordEmail extends BaseAuthEmail {

	getTemplate(language: LanguageCode, params: ResetPasswordEmailParams): NimaEmail {
		return super.customerEmailWithDetails({
			title: {
				[LanguageCode.en]: `Your ${ params.siteName } Password has been reset`,
				[LanguageCode.el]: `Ο κωδικός σας στο ${ params.siteName } έχει επανεφερθεί`,
			},
			mainText: {
				[LanguageCode.en]: `Dear ${ params.authDetails.user.firstName }.
Follow this link to reset your password: <a href="${ params.link }">${ params.link }</a>.
If you did not request this change, please ignore it.`,
				[LanguageCode.el]: `Αγαπητέ ${ params.authDetails.user.firstName }.
Ακολουθήστε τον υπερσύνδεσμο για να αλλάξετε τον κωδικό σας: <a href="${ params.link }">${ params.link }</a>.
Αν δεν αιτηθήκατε αυτή την αλλαγή κωδικού, αγνοήστε αυτό το email.`,
			},
			subject: {
				[LanguageCode.en]: `Somebody requested a password change for your associated ${ params.siteName } account.`,
				[LanguageCode.el]: `Κάποιος αιτήθηκε αλλαγή κωδικού για τον λογαριασμό σας στο ${ params.siteName }.`,
			},
			locale: language,
			authDetails: params.authDetails,
		});
	}
}

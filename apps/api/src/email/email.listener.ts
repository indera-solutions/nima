import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LanguageCode, observableToPromise } from '@nima-cms/utils';
import { AuthActionEntity } from '../auth/entities/AuthAction.entity';
import { SettingsService } from '../core/settings/settings.service';
import { Events } from '../events';
import { UserEntity } from '../users/entities/user.entity';
import { EmailService } from './email.service';
import { Emails } from './templates';
import { ResetPasswordEmail, ResetPasswordEmailParams } from './templates/auth/customer';
import { isNimaEmail, NimaEmail } from './templates/BaseEmail';

@Injectable()
export class EmailListener {
	constructor(
		private service: EmailService,
		private httpService: HttpService,
		private settingsService: SettingsService,
	) {
	}

	@OnEvent(Events.PASSWORD.RESET_REQUESTED)
	async passwordChangeRequested(payload: { user: UserEntity, authAction: AuthActionEntity, language: LanguageCode }) {
		const { authAction, user, language } = payload;
		const settings = await this.settingsService.getSettings();
		const link = user.isStaff ? process.env['STAFF_PASS_RECOVERY_LINK'] : ['USER_PASS_RECOVERY_LINK'];

		const params: ResetPasswordEmailParams = {
			authDetails: { authAction: authAction, user: user },
			siteName: settings.siteName,
			link: link + `?token=${ authAction.token }`,
		};
		const webhook = settings.emailWebhooks.find(setting => setting.emailType === Emails.RESET_PASSWORD);
		let template: NimaEmail;
		if ( webhook ) {
			const res = await observableToPromise(this.httpService.post(webhook.webhook, payload));
			if ( isNimaEmail(res.data) ) template = res.data;
			else throw new Error('RESULT_IS_NOT_NIMA_EMAIL_TEMPLATE');

		} else template = (new ResetPasswordEmail()).getTemplate(language, params);
		await this.service.sendEmail(template, user.email);
	}

	@OnEvent(Events.TEST)
	async test(payload: any) {
		const settings = await this.settingsService.getSettings();
		const webhook = settings.emailWebhooks.find(setting => setting.emailType === Emails.RESET_PASSWORD);
		if ( webhook ) {
			const obs = this.httpService.post(webhook.webhook, payload);
			const res = await observableToPromise(obs);
			// console.log(res);
		} else {
			console.log('no webhook found');
		}
	}
}

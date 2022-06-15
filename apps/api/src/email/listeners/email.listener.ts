import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LanguageCode } from '@nima-cms/utils';
import axios from 'axios';
import { AuthActionEntity } from '../../auth/entities/AuthAction.entity';
import { SettingsService } from '../../core/settings/settings.service';
import { Events } from '../../events';
import { UserEntity } from '../../users/entities/user.entity';
import { EmailService } from '../email.service';
import { Emails } from '../templates';
import { ResetPasswordEmail, ResetPasswordEmailParams } from '../templates/auth/customer';
import { NimaEmail } from '../templates/BaseEmail';

@Injectable()
export class EmailListener {
	constructor(
		private service: EmailService,
		private settingsService: SettingsService,
	) {
	}

	@OnEvent(Events.PASSWORD.RESET_REQUESTED)
	async passwordChangeRequested(payload: { user: UserEntity, authAction: AuthActionEntity, language: LanguageCode }) {
		const { authAction, user, language } = payload;
		const settings = await this.settingsService.getSettings();
		const link = user.isStaff ? process.env['STAFF_PASS_RECOVERY_LINK'] : process.env['USER_PASS_RECOVERY_LINK'];

		const params: ResetPasswordEmailParams = {
			authDetails: { authAction: authAction, user: user },
			siteName: settings.siteName,
			link: link + `?token=${ authAction.token }`,
		};
		let template: NimaEmail = await this.service.getWebhookTemplate(Emails.RESET_PASSWORD, payload, settings);
		if ( !template ) template = (new ResetPasswordEmail()).getTemplate(language, params);
		await this.service.sendEmail(template, user.email);
	}

	@OnEvent(Events.TEST)
	async test(payload: any) {
		const settings = await this.settingsService.getSettings();
		const webhook = settings.emailWebhooks.find(setting => setting.emailType === Emails.RESET_PASSWORD);
		if ( webhook ) {
			try {
				const res = await axios.post(webhook.webhook, payload);
				console.log(res);
			} catch ( e ) {
				console.log(e);
			}
		} else {
			console.log('no webhook found');
		}
	}
}

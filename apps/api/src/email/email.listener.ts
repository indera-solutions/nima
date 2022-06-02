import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { LanguageCode } from '@nima-cms/utils';
import { AuthActionEntity } from '../auth/entities/AuthAction.entity';
import { EmailWebhooksDto } from '../core/entities/settings.entity';
import { SettingsService } from '../core/settings/settings.service';
import { Events } from '../events';
import { UserEntity } from '../users/entities/user.entity';
import { EmailService } from './email.service';
import { Emails } from './templates';
import { ResetPasswordEmail, ResetPasswordEmailParams } from './templates/auth/customer';
import { isNimaEmail, NimaEmail } from './templates/BaseEmail';

@Controller('email')
export class EmailListener {
	constructor(
		private service: EmailService,
		private httpService: HttpService,
		private settingsService: SettingsService,
	) {
	}

	@OnEvent(Events.PASSWORD.RESET_REQUESTED)
	async passwordChangeRequested(payload: { user: UserEntity, authAction: AuthActionEntity, language: LanguageCode }) {
		const settings = await this.settingsService.getSettings();
		const params: ResetPasswordEmailParams = {
			authDetails: { authAction: payload.authAction, user: payload.user },
			siteName: settings.siteName,
			link: 'http://localhost:3333/docs/#/Authentication/Auth_resetPassword',
		};
		const webhook = settings.emailWebhooks.find(setting => setting.emailType === Emails.RESET_PASSWORD);
		const template: NimaEmail = (new ResetPasswordEmail()).getTemplate(payload.language, params);
		await this.sendTemplateOrExternal(payload.user.email, template, payload, webhook);
	}

	@OnEvent(Events.TEST)
	async test(payload: any) {
		const settings = await this.settingsService.getSettings();
		const webhook = settings.emailWebhooks.find(setting => setting.emailType === Emails.BASE_COMMERCE);
		if ( webhook ) {
			let test = undefined;
			this.httpService.post(webhook.webhook, payload).subscribe({
				next: value => {
					console.log(value.status);
					test = value.data;
					console.log(test);
				}, error: console.error, complete: console.info,
			});
		}
		console.dir(payload, { depth: 10 });
	}

	private async sendTemplateOrExternal(recipient: string, template: NimaEmail, payload: any, webhook?: EmailWebhooksDto) {
		if ( webhook ) {
			this.httpService.post(webhook.webhook, payload).subscribe({
				next: value => {
					if ( isNimaEmail(value.data) )
						this.service.sendEmail(value.data, recipient);
				}, error: console.error, complete: console.info,
			});
		} else {
			await this.service.sendEmail(template, recipient);
		}
	}
}

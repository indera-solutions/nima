import { Content, SendEmailCommand, SendEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SettingsDto } from '../core/dto/settings.dto';
import { SettingsService } from '../core/settings/settings.service';
import { Emails } from './templates';
import { isNimaEmail, NimaEmail } from './templates/BaseEmail';

export interface EmailParams {
	origin?: string;
	sender?: string;
	content: string;
	recipient: string;
	subject: string;
	html?: Content;
}

@Injectable()
export class EmailService {
	constructor(
		private settingsService: SettingsService,
	) {
	}


	private static async sendSystemEmail(emailParams: EmailParams) {
		if ( process.env['NODE_ENV'] === 'test' ) {
			console.log('Sending Email..');
			return;
		}
		if ( !emailParams ) throw new Error('MISSING_REQUIRED_EMAIL_PARAMS');
		if ( !emailParams.recipient ) throw new Error('MISSING_RECIPIENT');
		try {
			const sesClient = new SESClient({ region: 'eu-central-1' });
			const sesParams: SendEmailCommandInput = {
				Destination: {
					ToAddresses: [emailParams.recipient],
				},
				Message: {
					Body: {
						Text: { Data: emailParams.content },
						Html: emailParams.html ? emailParams.html : undefined,
					},
					Subject: { Data: emailParams.subject },
				},
				Source: emailParams.sender || 'szarpas@indera.gr',
			};
			const command = new SendEmailCommand(sesParams);
			await sesClient.send(command);
		} catch ( e ) {
			console.error(e);
			throw e;
		}
	}

	async sendEmail(email: NimaEmail, recipient: string) {
		const settings = await this.settingsService.getSettings();
		await EmailService.sendSystemEmail({
			html: email.html ? { Data: email.html } : undefined,
			origin: settings.baseUrl,
			sender: settings.senderEmail,
			content: email.body,
			recipient: recipient,
			subject: email.subject,
		});
	}

	async sendAdminEmail(email: NimaEmail) {
		const settings = await this.settingsService.getSettings();
		await EmailService.sendSystemEmail({
			html: email.html ? { Data: email.html } : undefined,
			origin: settings.baseUrl,
			sender: settings.senderEmail,
			content: email.body,
			recipient: settings.adminEmail,
			subject: email.subject,
		});
	}

	async getWebhookTemplate(emailType: Emails, payload: any, settings?: SettingsDto): Promise<NimaEmail | undefined> {
		let _settings = settings;
		if ( !_settings ) {
			_settings = await this.settingsService.getSettings();
		}
		const webhook = _settings.emailWebhooks.find(setting => setting.emailType === emailType);
		if ( webhook ) {
			const res = await axios.post(webhook.webhook, payload);
			if ( isNimaEmail(res.data) ) return res.data;
			else throw new Error('RESULT_IS_NOT_NIMA_EMAIL_TEMPLATE');
		} else return undefined;
	}
}

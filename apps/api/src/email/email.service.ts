import { Content, SendEmailCommand, SendEmailCommandInput, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { SettingsService } from '../core/settings/settings.service';
import { NimaEmail } from './templates/BaseEmail';

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
}

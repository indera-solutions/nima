import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SettingsService } from '../core/settings/settings.service';
import { Events } from '../events';
import { EmailService } from './email.service';
import { Emails } from './templates';

@Controller('email')
export class EmailListener {
	constructor(
		private service: EmailService,
		private httpService: HttpService,
		private settingsService: SettingsService,
	) {
	}

	@OnEvent(Events.PASSWORD.RESET_REQUESTED)
	async passwordChangeRequested(payload: { email: string, token: string }) {

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
}

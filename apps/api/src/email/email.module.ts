import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { EmailService } from './email.service';
import { EmailCommerceListener } from './listeners/email.commerce.listener';
import { EmailListener } from './listeners/email.listener';

@Module({
	imports: [CoreModule],
	controllers: [],
	providers: [EmailService, EmailListener, EmailCommerceListener],
})
export class EmailModule {
}

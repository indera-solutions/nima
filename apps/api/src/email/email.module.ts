import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { EmailListener } from './email.listener';
import { EmailService } from './email.service';

@Module({
	imports: [CoreModule, HttpModule],
	controllers: [],
	providers: [EmailService, EmailListener],
})
export class EmailModule {
}

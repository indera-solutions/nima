import { Body, Controller, Post, Query } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsPublic, User } from '../auth/auth.decorator';
import { CommerceEmails } from '../email/templates/commerce';
import { Events } from '../events';
import { CoreService } from './core.service';

class TestDto {
	@ApiProperty({ enum: CommerceEmails })
	test: CommerceEmails;
}

@Controller('core')
export class CoreController {
	constructor(
		private readonly coreService: CoreService,
		private eventEmitter: EventEmitter2,
	) {
	}

	@Post('/test2')
	@ApiQuery({ enum: CommerceEmails, name: 'enumTest' })
	test2(@Body() dto: TestDto, @Query('enumTest') enumTest: CommerceEmails) {
		console.log(dto);
	}

	@Post('/test')
	@IsPublic()
	test(@Body() dto: any, @User() user?: any) {
		this.eventEmitter.emit(Events.TEST);
		return 'Hello!';
	}
}

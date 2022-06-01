import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsPublic, User } from '../auth/auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommerceEmails } from '../email/templates/commerce';
import { CoreService } from './core.service';

class TestDto {
	@ApiProperty({ enum: CommerceEmails })
	test: CommerceEmails;
}

@Controller('core')
export class CoreController {
	constructor(private readonly coreService: CoreService) {
	}

	@Post('/test2')
	@ApiQuery({ enum: CommerceEmails, name: 'enumTest' })
	test2(@Body() dto: TestDto, @Query('enumTest') enumTest: CommerceEmails) {
		console.log(dto);
	}

	@Post('/test')
	@ApiBearerAuth()
	@IsPublic()
	@UseGuards(JwtAuthGuard)
	test(@Body() dto: any, @User() user?: any) {
		console.log(user);
		console.log(dto);
		return 'Hello!';
	}
}

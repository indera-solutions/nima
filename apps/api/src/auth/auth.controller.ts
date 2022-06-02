import { Body, Controller, Get, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
	LoginUserDto,
	RegisterUserDto,
	RequestUserPasswordChangeDto,
	SuccessLoginResponse,
	UpdateUserPasswordDto,
} from '../users/dto/user.dto';
import { IsPublic } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post('/register')
	@IsPublic()
	async register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@IsPublic()
	@Post('/login')
	@ApiBody({ type: LoginUserDto })
	@ApiOkResponse({ type: SuccessLoginResponse })
	async login(@Request() req): Promise<SuccessLoginResponse> {
		return this.authService.login(req.user);
	}

	@IsPublic()
	@Post('/passwordReset')
	@ApiBody({ type: RequestUserPasswordChangeDto })
	async requestPasswordReset(@Body() passwordChangeDto: RequestUserPasswordChangeDto) {
		return this.authService.requestPasswordReset({ passwordChangeDto: passwordChangeDto });
	}

	@IsPublic()
	@Patch('/passwordReset')
	@ApiBody({ type: UpdateUserPasswordDto })
	@ApiQuery({ name: 'token', required: true, type: String })
	async resetPassword(@Query('token') token: string, @Body() passwordChangeDto: UpdateUserPasswordDto) {
		return this.authService.resetPassword({ token: token, dto: passwordChangeDto });
	}

	// @UseGuards(JwtAuthGuard)
	@Get('/profile')
	getHello(@Request() req) {
		return req.user;
	}
}

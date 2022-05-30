import { Body, Controller, Get, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	LoginUserDto,
	RegisterUserDto,
	RequestUserPasswordChangeDto,
	SuccessLoginResponse,
	UpdateUserPasswordDto,
} from '../users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(private authService: AuthService) {
	}

	@Post('/register')
	async register(@Body() registerUserDto: RegisterUserDto) {
		return this.authService.register(registerUserDto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@ApiBody({ type: LoginUserDto })
	@ApiOkResponse({ type: SuccessLoginResponse })
	async login(@Request() req): Promise<SuccessLoginResponse> {
		return this.authService.login(req.user);
	}

	@Post('/passwordReset')
	@ApiBody({ type: RequestUserPasswordChangeDto })
	async requestPasswordReset(@Body() passwordChangeDto: RequestUserPasswordChangeDto) {
		return this.authService.requestPasswordReset({ passwordChangeDto: passwordChangeDto });
	}

	@Patch('/passwordReset')
	@ApiBody({ type: UpdateUserPasswordDto })
	async resetPassword(@Query('token') token: string, @Body() passwordChangeDto: UpdateUserPasswordDto) {
		return this.authService.resetPassword({ token: token, dto: passwordChangeDto });
	}

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getHello(@Request() req) {
		return req.user;
	}
}

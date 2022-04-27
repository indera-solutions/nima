import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from '@nima/interfaces';
import { LoginUserDto, SuccessLoginResponse } from '../users/dto/user.dto';
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

	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	getHello(@Request() req) {
		return req.user;
	}
}

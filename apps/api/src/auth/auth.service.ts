import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
	RegisterUserDto,
	RequestUserPasswordChangeDto,
	SuccessLoginResponse,
	UpdateUserPasswordDto,
} from '../users/dto/user.dto';
import { UserRepository } from '../users/entities/user.repository';
import { UsersService } from '../users/users.service';
import { AuthActionEntity, AuthActionType } from './entities/AuthAction.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private userRepository: UserRepository,
		private jwtService: JwtService,
		@InjectRepository(AuthActionEntity)
		private authActionEntityRepository: Repository<AuthActionEntity>,
	) {
	}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.getByEmail({ email: username });
		const isMatch = await bcrypt.compare(pass, user.password);
		if ( isMatch ) {
			return {
				id: user.id,
				email: user.email,
				lastLogin: user.lastLogin,
				metadata: user.metadata,
				isStaff: user.isStaff,
				isAdmin: user.isAdmin,
				isActive: user.isActive,
			};
		}
		return null;
	}

	async login(user: any): Promise<SuccessLoginResponse> {
		return {
			access_token: this.jwtService.sign(user),
		};
	}

	async register(registerUserDto: RegisterUserDto) {
		const existing = await this.userRepository.findByEmail(registerUserDto.email);
		if ( existing ) throw new Error('USER_ALREADY_EXISTS');

		const res = await this.userService.create({ registerUserDto: registerUserDto });
		const _user = await this.userService.getById(res);
		const user = {
			id: _user.id,
			email: _user.email,
			lastLogin: _user.lastLogin,
			metadata: _user.metadata,
			isStaff: _user.isStaff,
			isAdmin: _user.isAdmin,
			isActive: _user.isActive,
		};
		return {
			access_token: this.jwtService.sign(user),
		};
	}

	async requestPasswordReset(params: { passwordChangeDto: RequestUserPasswordChangeDto }) {
		const { passwordChangeDto } = params;
		const user = await this.userService.getByEmail({ email: passwordChangeDto.email });
		const res = await this.authActionEntityRepository.save({ user: user, actionType: AuthActionType.RESET_PASSWORD, hasLoggedInSince: false });
		//TODO: Send email with link to reset password
		console.log(res);
		//temporary return to see token
		return res;
	}

	async resetPassword(params: { token: string, dto: UpdateUserPasswordDto }) {
		const { token, dto } = params;
		const action = await this.authActionEntityRepository.findOne({ where: { token: token } });
		if ( !action || action.actionType !== AuthActionType.RESET_PASSWORD ) throw new BadRequestException('PASSWORD_CHANGE_NOT_REQUESTED');

		return this.userService.changePassword({ id: action.userId, dto: dto });
	}
}

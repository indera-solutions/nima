import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '@nima/interfaces';
import { UserRepository } from '../users/entities/user.repository';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {
	}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userRepository.findByEmail(username);
		if ( user && user.password === pass ) {
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

	async login(user: any) {
		return {
			access_token: this.jwtService.sign(user),
		};
	}

	register(registerUserDto: RegisterUserDto) {
		const existing = this.userRepository.findByEmail(registerUserDto.email);
		if ( existing ) throw new Error('USER_ALREADY_EXISTS');


	}
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, RegisterUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) {
	}


	async register(params: { registerUserDto: RegisterUserDto }) {
		return await this.create({
			createUserDto: {
				...params.registerUserDto,
				isAdmin: false,
				isStaff: false,
				isActive: false,
				metadata: {},
				privateMetadata: {},
			},
		});
	}

	async create(params: { createUserDto: CreateUserDto }) {
		const { createUserDto } = params;
		const hash = await this.hashPassword(createUserDto.password);
		const res = await this.userRepository.insert({
			...createUserDto,
			password: hash,
		});
		return res.identifiers[0].id;
	}

	findAll() {
		return this.userRepository.find();
	}

	async getById(params: { id: number }) {
		const user = await this.userRepository.findById(params.id);
		if ( !user ) throw new BadRequestException('USER_DOES_NOT_EXIST');
		return user;
	}

	async getByEmail(params: { email: string }): Promise<UserEntity> {
		const { email } = params;
		const res = await this.userRepository.findByEmail(email);
		if ( !res ) throw new NotFoundException('USER_NOT_FOUND');
		return res;
	}

	async update(params: { id: number, updateUserDto: UpdateUserDto }) {
		const { updateUserDto, id } = params;
		await this.getById({ id: id });
		if ( updateUserDto.password ) {
			updateUserDto.password = await this.hashPassword(updateUserDto.password);
		} else {
			delete updateUserDto.password;
		}
		await this.userRepository.update(id, updateUserDto);
		return this.getById({ id: id });
	}

	async changePassword(params: { id: number, dto: UpdateUserPasswordDto }) {
		const { dto, id } = params;
		await this.getById({ id: id });
		const hash = await this.hashPassword(dto.password);
		await this.userRepository.update(id, { password: hash });
		return this.getById({ id: id });
	}

	async remove(params: { id: number }) {
		const user = await this.getById({ id: params.id });
		await this.userRepository.delete(params.id);
		return user;
	}

	private async hashPassword(plain: string): Promise<string> {
		return await bcrypt.hash(plain, 10);
	}
}

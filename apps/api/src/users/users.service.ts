import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) {
	}

	async create(params: { registerUserDto: RegisterUserDto }) {
		const { registerUserDto } = params;
		const hash = await bcrypt.hash(registerUserDto.password, 10);
		const res = await this.userRepository.insert({
			...registerUserDto,
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
		await this.userRepository.update(id, updateUserDto);
		return this.getById({ id: id });
	}

	async changePassword(params: { id: number, dto: UpdateUserPasswordDto }) {
		const { dto, id } = params;
		await this.getById({ id: id });
		const hash = await bcrypt.hash(dto.password, 10);
		await this.userRepository.update(id, { password: hash });
		return this.getById({ id: id });
	}

	async remove(params: { id: number }) {
		const user = await this.getById({ id: params.id });
		await this.userRepository.delete(params.id);
		return user;
	}
}

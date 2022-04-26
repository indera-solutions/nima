import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) {
	}

	create(createUserDto: CreateUserDto) {
		return 'This action adds a new user';
	}

	findAll() {
		return `This action returns all users`;
	}

	findOne(id: number) {
		return `This action returns a #${ id } user`;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${ id } user`;
	}

	remove(id: number) {
		return `This action removes a #${ id } user`;
	}
}

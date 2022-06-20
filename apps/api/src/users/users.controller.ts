import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsStaff, User } from '../auth/auth.decorator';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Post()
	@ApiCreatedResponse({ type: UserDto })
	@IsStaff()
	async create(@Body() createUserDto: CreateUserDto, @User() user?: UserEntity): Promise<UserDto> {
		const res = await this.usersService.create({ createUserDto: createUserDto });
		return UserDto.prepare(res, { isAdmin: user?.isStaff });
	}

	@Get()
	@ApiOkResponse({ type: UserDto, isArray: true })
	@IsStaff()
	async findAll(@User() user?: UserEntity): Promise<UserDto[]> {
		const res = await this.usersService.findAll();
		return res.map(u => UserDto.prepare(u, { isAdmin: user?.isStaff }));
	}

	@Get(':id')
	@ApiOkResponse({ type: UserDto })
	@IsStaff()
	async findOne(@Param('id') id: number, @User() user?: UserEntity): Promise<UserDto> {
		const res = await this.usersService.getById({ id: id });
		return UserDto.prepare(res, { isAdmin: user?.isStaff });
	}

	@Patch(':id')
	@ApiOkResponse({ type: UserDto })
	@IsStaff()
	async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @User() user?: UserEntity) {
		const res = await this.usersService.update({ id, updateUserDto });
		return UserDto.prepare(res, { isAdmin: user?.isStaff });
	}

	@Delete(':id')
	@ApiOkResponse({ type: UserDto })
	@IsStaff()
	async remove(@Param('id') id: number, @User() user?: UserEntity) {
		const res = await this.usersService.remove({ id: id });
		return UserDto.prepare(res, { isAdmin: user?.isStaff });
	}
}

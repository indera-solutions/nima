import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsStaff } from '../auth/auth.decorator';
import { RegisterUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Post()
	@IsStaff()
	create(@Body() createUserDto: RegisterUserDto) {
		return this.usersService.create({ registerUserDto: createUserDto });
	}

	@Get()
	@IsStaff()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	@IsStaff()
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.getById({ id: id });
	}

	@Patch(':id')
	@IsStaff()
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update({ id, updateUserDto });
	}

	@Delete(':id')
	@IsStaff()
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove({ id: id });
	}
}

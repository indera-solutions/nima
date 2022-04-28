import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UserEntity {
}

export class CreateUserDto {
}

export class LoginUserDto extends PickType(UserDto, ['email']) {
	@ApiProperty()
	@IsString()
	password: string;
	@ApiProperty()
	@IsEmail()
	email: string;
}

export class RegisterUserDto extends PickType(UserDto, ['email', 'firstName', 'lastName']) {
	@ApiProperty()
	@IsString()
	password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}

export class SuccessLoginResponse {
	@ApiProperty({ type: String })
	access_token: string;
}

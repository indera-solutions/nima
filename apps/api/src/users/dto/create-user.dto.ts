import { ApiProperty } from '@nestjs/swagger';
import { User } from '@nima/interfaces';

export class CreateUserDto {}

export class LoginUserDto implements Pick<User, 'email'> {
	@ApiProperty()
	password: string;
	@ApiProperty()
	email: string;
}

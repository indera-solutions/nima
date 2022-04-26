import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends UserEntity {
}

export class CreateUserDto {
}

export class LoginUserDto extends PickType(UserDto, ['email']) {
	@ApiProperty()
	password: string;
	@ApiProperty()
	email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}

export class SuccessLoginResponse {
	@ApiProperty({ type: String })
	access_token: string;
}

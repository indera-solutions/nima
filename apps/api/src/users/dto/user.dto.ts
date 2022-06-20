import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto extends OmitType(UserEntity, ['password']) {

	static prepare(entity: UserEntity, options?: { isAdmin?: boolean }): UserDto {
		return {
			lastLogin: entity.lastLogin,
			createdAt: entity.createdAt,
			email: entity.email,
			id: entity.id,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			isAdmin: entity.isAdmin,
			updatedAt: entity.updatedAt,
			addresses: entity.addresses,
			avatar: entity.avatar,
			languageCode: entity.languageCode,
			defaultBillingAddress: entity.defaultBillingAddress,
			firstName: entity.firstName,
			lastName: entity.lastName,
			isActive: entity.isActive,
			isStaff: entity.isStaff,
			notes: entity.notes,
			defaultShippingAddress: entity.defaultShippingAddress,
		};
	}
}

export class CreateUserDto extends OmitType(UserDto, ['createdAt', 'id', 'lastLogin', 'updatedAt', 'addresses', 'defaultBillingAddress', 'defaultShippingAddress']) {
	@ApiProperty()
	@IsString()
	password?: string;
}

export class LoginUserDto extends PickType(UserDto, ['email']) {
	@ApiProperty()
	@IsString()
	password: string;
	@ApiProperty()
	@IsEmail()
	email: string;
}

export class RegisterUserDto extends PickType(UserDto, ['email', 'firstName', 'lastName', 'languageCode']) {
	@ApiProperty()
	@IsString()
	password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}

export class UpdateUserInfoDto extends PartialType(CreateUserDto) {
}

export class SuccessLoginResponse {
	@ApiProperty({ type: String })
	access_token: string;
}

export class UpdateUserPasswordDto {
	@ApiProperty()
	@IsString()
	password: string;
}

export class RequestUserPasswordChangeDto extends PickType(UserDto, ['email']) {
	@ApiProperty()
	@IsEmail()
	email: string;
}

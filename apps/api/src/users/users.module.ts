import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService, TypeOrmModule.forFeature([UserRepository])],
})
export class UsersModule {
}

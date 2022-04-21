import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../users/entities/user.repository';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
	let controller: AuthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UsersModule, TypeOrmModule.forFeature([UserRepository])],
			controllers: [AuthController],
			providers: [AuthService, UsersService],
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('register', () => {
		it('should register the user', async () => {
			const user = await controller.register({ email: 'test@test.com', password: 'ASDF123' });
			expect(user).toBeDefined();

		});
	});

	describe('login', () => {
		it('should login the user', async () => {
			const user = await controller.login({ email: 'test@test.com', password: 'ASDF123' });
			expect(user).toBeDefined();

		});
	});
});

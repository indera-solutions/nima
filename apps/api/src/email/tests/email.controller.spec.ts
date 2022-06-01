import { Test, TestingModule } from '@nestjs/testing';
import { EmailListener } from '../email.controller';

describe('EmailController', () => {
	let controller: EmailListener;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EmailListener],
		}).compile();

		controller = module.get<EmailListener>(EmailListener);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

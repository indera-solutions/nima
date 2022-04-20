import { Test, TestingModule } from '@nestjs/testing';
import { AttributesController } from '../attributes.controller';

describe('AttributesController', () => {
	let controller: AttributesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AttributesController],
		}).compile();

		controller = module.get<AttributesController>(AttributesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

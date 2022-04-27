import { Test, TestingModule } from '@nestjs/testing';
import { AttributeValuesService } from '../../attribute-values/attribute-values.service';
import { AttributeValuesController } from '../attribute-values.controller';

describe('AttributeValuesController', () => {
	let controller: AttributeValuesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AttributeValuesController],
			providers: [AttributeValuesService],
		}).compile();

		controller = module.get<AttributeValuesController>(AttributeValuesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

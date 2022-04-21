import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypesController } from '../product-types.controller';
import { ProductTypesService } from '../product-types.service';

describe('ProductTypesController', () => {
	let controller: ProductTypesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductTypesController],
			providers: [ProductTypesService],
		}).compile();

		controller = module.get<ProductTypesController>(ProductTypesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

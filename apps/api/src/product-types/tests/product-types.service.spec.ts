import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypesService } from '../product-types.service';

describe('ProductTypesService', () => {
	let service: ProductTypesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypesService],
		}).compile();

		service = module.get<ProductTypesService>(ProductTypesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

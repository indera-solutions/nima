import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeAttributeService } from '../product-type-attribute.service';

describe('ProductTypeAttributeService', () => {
	let service: ProductTypeAttributeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypeAttributeService],
		}).compile();

		service = module.get<ProductTypeAttributeService>(ProductTypeAttributeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

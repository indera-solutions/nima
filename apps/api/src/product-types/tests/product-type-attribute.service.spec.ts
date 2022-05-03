import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeAttributesService } from '../product-type-attributes.service';

describe('ProductTypeAttributeService', () => {
	let service: ProductTypeAttributesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypeAttributesService],
		}).compile();

		service = module.get<ProductTypeAttributesService>(ProductTypeAttributesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

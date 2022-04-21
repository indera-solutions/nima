import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeVariantAttributeService } from '../product-type-variant-attribute.service';

describe('ProductTypeVariantAttributeService', () => {
	let service: ProductTypeVariantAttributeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypeVariantAttributeService],
		}).compile();

		service = module.get<ProductTypeVariantAttributeService>(ProductTypeVariantAttributeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

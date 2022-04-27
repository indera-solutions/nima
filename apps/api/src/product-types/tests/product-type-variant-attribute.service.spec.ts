import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeVariantAttributesService } from '../product-type-variant-attributes.service';

describe('ProductTypeVariantAttributeService', () => {
	let service: ProductTypeVariantAttributesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypeVariantAttributesService],
		}).compile();

		service = module.get<ProductTypeVariantAttributesService>(ProductTypeVariantAttributesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

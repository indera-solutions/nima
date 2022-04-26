import { Test, TestingModule } from '@nestjs/testing';
import { DiscountSalesService } from '../discounts.service';

describe('DiscountsService', () => {
	let service: DiscountSalesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DiscountSalesService],
		}).compile();

		service = module.get<DiscountSalesService>(DiscountSalesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

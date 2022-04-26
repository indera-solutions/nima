import { Test, TestingModule } from '@nestjs/testing';
import { DiscountSalesController } from '../discounts.controller';
import { DiscountSalesService } from '../discounts.service';

describe('DiscountsController', () => {
	let controller: DiscountSalesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DiscountSalesController],
			providers: [DiscountSalesService],
		}).compile();

		controller = module.get<DiscountSalesController>(DiscountSalesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

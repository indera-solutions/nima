import { Test, TestingModule } from '@nestjs/testing';
import { ShippingMethodController } from '../controllers/shipping-method.controller';
import { ShippingService } from '../shipping.service';

describe('ShippingController', () => {
	let controller: ShippingMethodController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ShippingMethodController],
			providers: [ShippingService],
		}).compile();

		controller = module.get<ShippingMethodController>(ShippingMethodController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

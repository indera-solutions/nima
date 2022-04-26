import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto, UpdateCheckoutDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
	create(createCheckoutDto: CreateCheckoutDto) {
		return 'This action adds a new checkout';
	}

	findAll() {
		return `This action returns all checkout`;
	}

	findOne(id: number) {
		return `This action returns a #${ id } checkout`;
	}

	update(id: number, updateCheckoutDto: UpdateCheckoutDto) {
		return `This action updates a #${ id } checkout`;
	}

	remove(id: number) {
		return `This action removes a #${ id } checkout`;
	}
}

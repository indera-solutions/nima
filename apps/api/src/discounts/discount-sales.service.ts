import { Injectable } from '@nestjs/common';
import { CreateDiscountSaleDto, UpdateDiscountDto } from './dto/discount-sale.dto';

@Injectable()
export class DiscountSalesService {
	create(createDiscountDto: CreateDiscountSaleDto) {
		return 'This action adds a new discount';
	}

	findAll() {
		return `This action returns all discounts`;
	}

	findOne(id: number) {
		return `This action returns a #${ id } discount`;
	}

	update(id: number, updateDiscountDto: UpdateDiscountDto) {
		return `This action updates a #${ id } discount`;
	}

	remove(id: number) {
		return `This action removes a #${ id } discount`;
	}
}

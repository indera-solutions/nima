import { Injectable } from '@nestjs/common';
import { ProductTypeAttributeRepository } from './repositories';

@Injectable()
export class ProductTypeAttributeService {
	constructor(private productTypeAttributeRepository: ProductTypeAttributeRepository) {
	}
}

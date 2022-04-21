import { Injectable } from '@nestjs/common';
import { ProductTypeVariantAttributeRepository } from './repositories';

@Injectable()
export class ProductTypeVariantAttributeService {
	constructor(private productTypeVariantAttributeRepository: ProductTypeVariantAttributeRepository) {
	}
}

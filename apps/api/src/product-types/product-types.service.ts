import { Injectable } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeRepository } from './repositories';

@Injectable()
export class ProductTypesService {
	constructor(private productTypeRepository: ProductTypeRepository) {
	}

	create(createProductTypeDto: CreateProductTypeDto) {
		return 'This action adds a new productType';
	}

	findAll() {
		return `This action returns all productTypes`;
	}

	findOne(id: number) {
		return `This action returns a #${ id } productType`;
	}

	update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
		return `This action updates a #${ id } productType`;
	}

	remove(id: number) {
		return `This action removes a #${ id } productType`;
	}
}

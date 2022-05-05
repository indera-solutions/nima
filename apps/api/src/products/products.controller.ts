import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto, ProductTypeDto } from '../product-types/dto/product-type.dto';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {
	}

	@Post()
	@ApiCreatedResponse({ type: ProductDto })
	@ApiBody({ type: CreateProductTypeDto })
	async create(@Body() createProductDto: CreateProductDto) {
		const product = await this.productsService.save({ dto: createProductDto });
		return ProductDto.prepare(product);
	}

	@Get()
	@ApiOkResponse({ type: [ProductTypeDto] })
	async findAll() {
		const products = await this.productsService.findAll();
		return products.map(product => ProductDto.prepare(product));
	}

	@Get(':id')
	@ApiOkResponse({ type: ProductTypeDto })
	async getById(@Param('id', ParseIntPipe) id: number) {
		const product = await this.productsService.getById({ id: id });
		return ProductDto.prepare(product);
	}

	@Put(':id')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiBody({ type: CreateProductTypeDto })
	async update(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto) {
		const product = await this.productsService.save({ dto: createProductDto, id: id });
		return ProductDto.prepare(product);
	}

	@Delete(':id')
	@ApiOkResponse({ type: ProductTypeDto })
	async remove(@Param('id', ParseIntPipe) id: number) {
		const product = await this.productsService.remove({ id: id });
		return ProductDto.prepare(product);
	}
}

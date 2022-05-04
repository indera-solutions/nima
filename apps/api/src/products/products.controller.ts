import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {
	}

	@Post()
	@ApiCreatedResponse({ type: ProductDto })
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.save({ dto: createProductDto });
	}

	@Get()
	findAll() {
		return this.productsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.findOne({ id: id });
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(+id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.remove({ id: id });
	}
}

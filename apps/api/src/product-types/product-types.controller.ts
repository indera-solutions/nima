import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto, UpdateProductTypeDto } from './dto/product-type.dto';
import { ProductTypesService } from './product-types.service';

@Controller('product-types')
@ApiTags('Product Types')
export class ProductTypesController {
	constructor(private readonly productTypesService: ProductTypesService) {
	}

	@Post()
	create(@Body() createProductTypeDto: CreateProductTypeDto) {
		return this.productTypesService.create(createProductTypeDto);
	}

	@Get()
	findAll() {
		return this.productTypesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productTypesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductTypeDto: UpdateProductTypeDto) {
		return this.productTypesService.update(+id, updateProductTypeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productTypesService.remove(+id);
	}
}

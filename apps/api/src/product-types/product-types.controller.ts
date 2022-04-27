import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto, ProductTypeDto, UpdateProductTypeDto } from './dto/product-type.dto';
import { ProductTypesService } from './product-types.service';

@Controller('product-types')
@ApiTags('Product Types')
export class ProductTypesController {
	constructor(private readonly productTypesService: ProductTypesService) {
	}

	@Post()
	@ApiResponse({ type: ProductTypeDto })
	@ApiBody({ type: CreateProductTypeDto })
	create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
		return this.productTypesService.save({ dto: createProductTypeDto });
	}

	@Get()
	@ApiResponse({ type: [ProductTypeDto] })
	findAll(): Promise<ProductTypeDto[]> {
		return this.productTypesService.list();
	}

	@Get(':productTypeId')
	@ApiResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	findOne(@Param('productTypeId', ParseIntPipe) id: number): Promise<ProductTypeDto> {
		return this.productTypesService.getById({ id });
	}

	@Patch(':productTypeId')
	@ApiResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() updateProductTypeDto: UpdateProductTypeDto) {
		return this.productTypesService.patchProductType({ productTypeId: productTypeId, dto: updateProductTypeDto });
	}

	@Delete(':productTypeId')
	remove(@Param('productTypeId', ParseIntPipe) productTypeId: number) {
		return this.productTypesService.deleteById({ id: productTypeId });
	}
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
	CreateProductTypeAttributeDto,
	ProductTypeAttributeDto,
	UpdateProductTypeAttributeDto,
} from './dto/product-type-attribute.dto';
import { ProductTypeAttributeService } from './product-type-attribute.service';

@Controller('product-types/:productTypeId')
@ApiTags('Product Types')
export class ProductTypesController {
	constructor(private readonly service: ProductTypeAttributeService) {
	}

	@Post()
	@ApiResponse({ type: ProductTypeAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeAttributeDto })
	create(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeAttributeDto): Promise<ProductTypeAttributeDto> {
		return this.service.save({ dto: createProductTypeDto, productTypeId: productTypeId });
	}

	@Get()
	@ApiResponse({ type: [ProductTypeAttributeDto] })
	@ApiParam({ type: Number, name: 'productTypeId' })
	findAll(@Param('productTypeId', ParseIntPipe) productTypeId: number): Promise<ProductTypeAttributeDto[]> {
		return this.service.listOfProductType({ productTypeId: productTypeId });
	}

	@Get(':productTypeAttributeId')
	@ApiResponse({ type: ProductTypeAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	getOne(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number) {
		return this.service.getById({ productTypeAttributeId: productTypeAttributeId });
	}

	@Patch(':productTypeAttributeId')
	@ApiResponse({ type: ProductTypeAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	@ApiBody({ type: UpdateProductTypeAttributeDto })
	patch(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number, @Body() updateProductTypeDto: UpdateProductTypeAttributeDto) {
		return this.service.patch({ productTypeAttributeId: productTypeAttributeId, dto: updateProductTypeDto, productTypeId: productTypeId });
	}

	@Put(':productTypeAttributeId')
	@ApiResponse({ type: ProductTypeAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	@ApiBody({ type: CreateProductTypeAttributeDto })
	update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number, @Body() createProductTypeAttributeDto: CreateProductTypeAttributeDto) {
		return this.service.save({ productTypeAttributeId: productTypeAttributeId, dto: createProductTypeAttributeDto, productTypeId: productTypeId });
	}

	@Delete(':productTypeAttributeId')
	@ApiResponse({ type: ProductTypeAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	remove(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number) {
		return this.service.deleteById({ productTypeAttributeId: productTypeAttributeId });
	}
}

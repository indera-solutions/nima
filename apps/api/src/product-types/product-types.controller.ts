import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductTypeDto, ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeAttributesService } from './product-type-attributes.service';
import { ProductTypeVariantAttributesService } from './product-type-variant-attributes.service';
import { ProductTypesService } from './product-types.service';

@Controller('product-types')
@ApiTags('Product Types')
export class ProductTypesController {
	constructor(
		private readonly productTypesService: ProductTypesService,
		private readonly productTypeAttributesService: ProductTypeAttributesService,
		private readonly productTypeVariantAttributesService: ProductTypeVariantAttributesService,
	) {
	}

	@Post()
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiBody({ type: CreateProductTypeDto })
	create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
		return this.productTypesService.save({ dto: createProductTypeDto });
	}

	@Get()
	@ApiOkResponse({ type: [ProductTypeDto] })
	findAll(): Promise<ProductTypeDto[]> {
		return this.productTypesService.list();
	}

	@Get(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	findOne(@Param('productTypeId', ParseIntPipe) id: number): Promise<ProductTypeDto> {
		return this.productTypesService.getById({ id });
	}

	@Put(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeDto })
	update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeDto) {
		return this.productTypesService.save({ id: productTypeId, dto: createProductTypeDto });
	}

	@Delete(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	remove(@Param('productTypeId', ParseIntPipe) productTypeId: number) {
		return this.productTypesService.deleteById({ id: productTypeId });
	}
}

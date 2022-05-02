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
	async create(@Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
		const res = await this.productTypesService.save({ dto: createProductTypeDto });
		return ProductTypeDto.prepare(res);
	}

	@Get()
	@ApiOkResponse({ type: [ProductTypeDto] })
	async findAll(): Promise<ProductTypeDto[]> {
		const res = await this.productTypesService.list();
		return res.map(r => ProductTypeDto.prepare(r));
	}

	@Get(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	async findOne(@Param('productTypeId', ParseIntPipe) id: number): Promise<ProductTypeDto> {
		const res = await this.productTypesService.getById({ id });
		return ProductTypeDto.prepare(res);

	}

	@Put(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeDto })
	async update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeDto) {
		return this.productTypesService.save({ id: productTypeId, dto: createProductTypeDto });
	}

	@Delete(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	async remove(@Param('productTypeId', ParseIntPipe) productTypeId: number) {
		return this.productTypesService.deleteById({ id: productTypeId });
	}
}

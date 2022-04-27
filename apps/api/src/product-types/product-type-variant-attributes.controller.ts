import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import {
	CreateProductTypeVariantAttributeDto,
	ProductTypeVariantAttributeDto,
	UpdateProductTypeVariantAttributeDto,
} from './dto/product-type-attribute.dto';
import { ProductTypeVariantAttributesService } from './product-type-variant-attributes.service';

@Controller('product-types/:productTypeId/attributes/variant')
@ApiTags('Product Type Variant Attributes')
export class ProductTypeVariantAttributesController {
	constructor(private readonly service: ProductTypeVariantAttributesService) {
	}

	@Post()
	@ApiOkResponse({ type: ProductTypeVariantAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeVariantAttributeDto })
	create(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeVariantAttributeDto): Promise<ProductTypeVariantAttributeDto> {
		return this.service.save({ dto: createProductTypeDto, productTypeId: productTypeId });
	}

	@Get()
	@ApiOkResponse({ type: [ProductTypeVariantAttributeDto] })
	@ApiParam({ type: Number, name: 'productTypeId' })
	findAll(@Param('productTypeId', ParseIntPipe) productTypeId: number): Promise<ProductTypeVariantAttributeDto[]> {
		return this.service.listOfProductType({ productTypeId: productTypeId });
	}

	@Get(':productTypeAttributeId')
	@ApiOkResponse({ type: ProductTypeVariantAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	getOne(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number) {
		return this.service.getById({ productTypeAttributeId: productTypeAttributeId });
	}

	@Patch(':productTypeAttributeId')
	@ApiOkResponse({ type: ProductTypeVariantAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	@ApiBody({ type: UpdateProductTypeVariantAttributeDto })
	patch(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number, @Body() updateProductTypeDto: UpdateProductTypeVariantAttributeDto) {
		return this.service.patch({ productTypeAttributeId: productTypeAttributeId, dto: updateProductTypeDto, productTypeId: productTypeId });
	}

	@Put(':productTypeAttributeId')
	@ApiOkResponse({ type: ProductTypeVariantAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	@ApiBody({ type: CreateProductTypeVariantAttributeDto })
	update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number, @Body() createProductTypeVariantAttributeDto: CreateProductTypeVariantAttributeDto) {
		return this.service.save({ productTypeAttributeId: productTypeAttributeId, dto: createProductTypeVariantAttributeDto, productTypeId: productTypeId });
	}

	@Delete(':productTypeAttributeId')
	@ApiOkResponse({ type: ProductTypeVariantAttributeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiParam({ type: Number, name: 'productTypeAttributeId' })
	remove(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Param('productTypeAttributeId', ParseIntPipe) productTypeAttributeId: number) {
		return this.service.deleteById({ productTypeAttributeId: productTypeAttributeId });
	}
}

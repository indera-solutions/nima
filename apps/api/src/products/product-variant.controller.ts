import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductVariantDto, ProductVariantDto } from './dto/product-variant.dto';
import { ProductVariantService } from './product-variant.service';

@Controller('products/:productId/variants')
@ApiTags('Product Variants')
export class ProductVariantController {
	constructor(private readonly productVariantService: ProductVariantService) {
	}

	@Post()
	@ApiParam({ type: Number, name: 'productId' })
	@ApiCreatedResponse({ type: ProductVariantDto })
	@ApiBody({ type: CreateProductVariantDto })
	async create(@Param('productId', ParseIntPipe) productId: number, @Body() createProductVariantDto: CreateProductVariantDto) {
		const product = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto });
		return ProductVariantDto.prepare(product);
	}

	@Get()
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: [ProductVariantDto] })
	async findOfProduct(@Param('productId', ParseIntPipe) productId: number) {
		const products = await this.productVariantService.findAll({ productId: productId });
		return products.map(product => ProductVariantDto.prepare(product));
	}

	@Get(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	async getById(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number) {
		const product = await this.productVariantService.getById({ id: id });
		return ProductVariantDto.prepare(product);
	}

	@Put(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@ApiBody({ type: CreateProductVariantDto })
	async update(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number, @Body() createProductVariantDto: CreateProductVariantDto) {
		const product = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto, id: id });
		return ProductVariantDto.prepare(product);
	}

	@Delete(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	async remove(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number) {
		const product = await this.productVariantService.remove({ id: id });
		return ProductVariantDto.prepare(product);
	}
}

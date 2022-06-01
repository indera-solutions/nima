import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(@Param('productId', ParseIntPipe) productId: number, @Body() createProductVariantDto: CreateProductVariantDto) {
		const res = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto });
		return this.productVariantService.getDto(res);
	}

	@Get()
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: [ProductVariantDto] })
	async findOfProduct(@Param('productId', ParseIntPipe) productId: number): Promise<ProductVariantDto[]> {
		const products = await this.productVariantService.findIdsOfProduct({ productId: productId });
		const promises = products.map(product => this.productVariantService.getDto(product));
		return Promise.all(promises);
	}

	@Get(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	async getById(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number) {
		return this.productVariantService.getDto(id);
	}

	@Put(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@ApiBody({ type: CreateProductVariantDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async update(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number, @Body() createProductVariantDto: CreateProductVariantDto) {
		const res = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto, id: id });
		return this.productVariantService.getDto(res);
	}

	@Delete(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number) {
		const product = this.productVariantService.getDto(id);
		await this.productVariantService.remove({ id: id });
		return product;
	}
}

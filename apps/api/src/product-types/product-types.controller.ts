import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductTypeDto, ProductTypeDto } from './dto/product-type.dto';
import { ProductTypesService } from './services/product-types.service';

@Controller('product-types')
@ApiTags('Product Types')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductTypesController {
	constructor(
		private readonly productTypesService: ProductTypesService,
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
	async getById(@Param('productTypeId', ParseIntPipe) id: number): Promise<ProductTypeDto> {
		const res = await this.productTypesService.getById({ id });
		return ProductTypeDto.prepare(res);

	}

	@Put(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeDto })
	async update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeDto): Promise<ProductTypeDto> {
		const res = await this.productTypesService.save({ id: productTypeId, dto: createProductTypeDto });
		return ProductTypeDto.prepare(res);
	}

	@Delete(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	async remove(@Param('productTypeId', ParseIntPipe) productTypeId: number): Promise<ProductTypeDto> {
		const res = await this.productTypesService.deleteById({ id: productTypeId });
		return ProductTypeDto.prepare(res);
	}
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { DiscountSalesService } from './discount-sales.service';
import {
	CreateDiscountSaleDto,
	DiscountSaleAddCategoriesDto,
	DiscountSaleAddCollectionsDto,
	DiscountSaleAddProductsDto,
	DiscountSaleAddVariantsDto,
	DiscountSaleDto,
	UpdateDiscountDto,
} from './dto/discount-sale.dto';

@Controller('discounts')
@ApiTags('Discount')
export class DiscountSalesController {
	constructor(private readonly discountsService: DiscountSalesService) {
	}

	@Post()
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiBody({ type: CreateDiscountSaleDto })
	async create(@Body() createDiscountDto: CreateDiscountSaleDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.create({ createDiscountDto: createDiscountDto });
		return DiscountSaleDto.prepare(res);
	}

	@Get()
	@ApiOkResponse({ type: DiscountSaleDto })
	async findAll(): Promise<DiscountSaleDto[]> {
		const res = await this.discountsService.findAll();
		return res.map(r => DiscountSaleDto.prepare(r));
	}

	@Get(':id')
	@ApiOkResponse({ type: [DiscountSaleDto] })
	@ApiParam({ name: 'id', type: Number })
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.findOne({ id: id });
		return DiscountSaleDto.prepare(res);
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: UpdateDiscountDto })
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateDiscountDto: UpdateDiscountDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.update({ id: id, updateDiscountDto: updateDiscountDto });
		return DiscountSaleDto.prepare(res);
	}

	@Put(':id/products')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddProductsDto })
	async addProducts(@Param('id', ParseIntPipe) id: number, @Body() addProductsDto: DiscountSaleAddProductsDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.addProducts({ id: id, addProductsDto: addProductsDto });
		return DiscountSaleDto.prepare(res);
	}

	@Put(':id/categories')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddCategoriesDto })
	async addCategories(@Param('id', ParseIntPipe) id: number, @Body() addCategoriesDto: DiscountSaleAddCategoriesDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.addCategories({ id: id, addCategoriesDto: addCategoriesDto });
		return DiscountSaleDto.prepare(res);
	}

	@Put(':id/variants')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddVariantsDto })
	async addVariants(@Param('id', ParseIntPipe) id: number, @Body() addVariantsDto: DiscountSaleAddVariantsDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.addVariants({ id: id, addVariantsDto: addVariantsDto });
		return DiscountSaleDto.prepare(res);
	}

	@Put(':id/collections')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddCollectionsDto })
	async addCollections(@Param('id', ParseIntPipe) id: number, @Body() addCollectionsDto: DiscountSaleAddCollectionsDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.addCollections({ id: id, addCollectionsDto: addCollectionsDto });
		return DiscountSaleDto.prepare(res);
	}

	@Delete(':id')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	async remove(@Param('id', ParseIntPipe) id: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.remove({ id: id });
		return DiscountSaleDto.prepare(res);
	}

	@Delete(':id/products/:productId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'productId', type: Number })
	async removeProduct(@Param('id', ParseIntPipe) id: number, @Param('productId', ParseIntPipe) productId: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.removeProduct({ saleId: id, productId: productId });
		return DiscountSaleDto.prepare(res);
	}

	@Delete(':id/variants/:variantId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'variantId', type: Number })
	async removeVariant(@Param('id', ParseIntPipe) id: number, @Param('variantId', ParseIntPipe) variantId: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.removeVariant({ saleId: id, variantId: variantId });
		return DiscountSaleDto.prepare(res);
	}

	@Delete(':id/categories/:categoryId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'categoryId', type: Number })
	async removeCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.removeCategory({ saleId: id, categoryId: categoryId });
		return DiscountSaleDto.prepare(res);
	}

	@Delete(':id/collections/:collectionId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'collectionId', type: Number })
	async removeCollection(@Param('id', ParseIntPipe) id: number, @Param('collectionId', ParseIntPipe) collectionId: number): Promise<DiscountSaleDto> {
		const res = await this.discountsService.removeCollection({ saleId: id, collectionId: collectionId });
		return DiscountSaleDto.prepare(res);
	}
}

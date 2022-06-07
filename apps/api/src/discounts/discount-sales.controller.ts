import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff } from '../auth/auth.decorator';
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
@ApiBearerAuth()
export class DiscountSalesController {
	constructor(private readonly discountsService: DiscountSalesService) {
	}

	@Post()
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiBody({ type: CreateDiscountSaleDto })
	@IsStaff()
	async create(@Body() createDiscountDto: CreateDiscountSaleDto): Promise<DiscountSaleDto> {
		const res = await this.discountsService.create({ createDiscountDto: createDiscountDto });
		return this.discountsService.getDto(res);
	}

	@Get()
	@ApiOkResponse({ type: DiscountSaleDto, isArray: true })
	@IsPublic()
	async findAll(): Promise<DiscountSaleDto[]> {
		const res = await this.discountsService.findAllIds();
		const promises = res.map(r => this.discountsService.getDto(r));
		return await Promise.all(promises);
	}

	@Get(':id')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@IsPublic()
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<DiscountSaleDto> {
		return this.discountsService.getDto(id);
	}

	@Patch(':id')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: UpdateDiscountDto })
	@IsStaff()
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateDiscountDto: UpdateDiscountDto): Promise<DiscountSaleDto> {
		await this.discountsService.update({ id: id, updateDiscountDto: updateDiscountDto });
		return this.discountsService.getDto(id);
	}

	@Put(':id/products')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddProductsDto })
	@IsStaff()
	async addProducts(@Param('id', ParseIntPipe) id: number, @Body() addProductsDto: DiscountSaleAddProductsDto): Promise<DiscountSaleDto> {
		await this.discountsService.addProducts({ id: id, addProductsDto: addProductsDto });
		return this.discountsService.getDto(id);
	}

	@Put(':id/categories')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddCategoriesDto })
	@IsStaff()
	async addCategories(@Param('id', ParseIntPipe) id: number, @Body() addCategoriesDto: DiscountSaleAddCategoriesDto): Promise<DiscountSaleDto> {
		await this.discountsService.addCategories({ id: id, addCategoriesDto: addCategoriesDto });
		return this.discountsService.getDto(id);
	}

	@Put(':id/variants')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddVariantsDto })
	@IsStaff()
	async addVariants(@Param('id', ParseIntPipe) id: number, @Body() addVariantsDto: DiscountSaleAddVariantsDto): Promise<DiscountSaleDto> {
		await this.discountsService.addVariants({ id: id, addVariantsDto: addVariantsDto });
		return this.discountsService.getDto(id);
	}

	@Put(':id/collections')
	@ApiCreatedResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountSaleAddCollectionsDto })
	@IsStaff()
	async addCollections(@Param('id', ParseIntPipe) id: number, @Body() addCollectionsDto: DiscountSaleAddCollectionsDto): Promise<DiscountSaleDto> {
		await this.discountsService.addCollections({ id: id, addCollectionsDto: addCollectionsDto });
		return this.discountsService.getDto(id);
	}

	@Delete(':id')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@IsStaff()
	async remove(@Param('id', ParseIntPipe) id: number): Promise<DiscountSaleDto> {
		await this.discountsService.remove({ id: id });
		return this.discountsService.getDto(id);
	}

	@Delete(':id/products/:productId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'productId', type: Number })
	@IsStaff()
	async removeProduct(@Param('id', ParseIntPipe) id: number, @Param('productId', ParseIntPipe) productId: number): Promise<DiscountSaleDto> {
		await this.discountsService.removeProduct({ saleId: id, productId: productId });
		return this.discountsService.getDto(id);
	}

	@Delete(':id/variants/:variantId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'variantId', type: Number })
	@IsStaff()
	async removeVariant(@Param('id', ParseIntPipe) id: number, @Param('variantId', ParseIntPipe) variantId: number): Promise<DiscountSaleDto> {
		await this.discountsService.removeVariant({ saleId: id, variantId: variantId });
		return this.discountsService.getDto(id);
	}

	@Delete(':id/categories/:categoryId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'categoryId', type: Number })
	@IsStaff()
	async removeCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number): Promise<DiscountSaleDto> {
		await this.discountsService.removeCategory({ saleId: id, categoryId: categoryId });
		return this.discountsService.getDto(id);
	}

	@Delete(':id/collections/:collectionId')
	@ApiOkResponse({ type: DiscountSaleDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'collectionId', type: Number })
	@IsStaff()
	async removeCollection(@Param('id', ParseIntPipe) id: number, @Param('collectionId', ParseIntPipe) collectionId: number): Promise<DiscountSaleDto> {
		await this.discountsService.removeCollection({ saleId: id, collectionId: collectionId });
		return this.discountsService.getDto(id);
	}
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { DiscountVoucherService } from './discount-voucher.service';
import {
	DiscountAddCategoriesDto,
	DiscountAddCollectionsDto,
	DiscountAddProductsDto,
	DiscountAddVariantsDto,
} from './dto/discount-sale.dto';
import { CreateDiscountVoucherDto, DiscountVoucherDto, UpdateDiscountVoucherDto } from './dto/discount-voucher.dto';

@Controller('vouchers')
@ApiTags('Vouchers')
@ApiBearerAuth()
export class DiscountVoucherController {
	constructor(
		private voucherService: DiscountVoucherService,
	) {
	}

	@Post()
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiBody({ type: CreateDiscountVoucherDto })
	@IsStaff()
	async create(@Body() createVoucherDto: CreateDiscountVoucherDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		const res = await this.voucherService.create({ createDiscountVoucherDto: createVoucherDto });
		return this.voucherService.getDto(res, { isAdmin: user?.isStaff || false });
	}

	@Get()
	@ApiOkResponse({ type: DiscountVoucherDto, isArray: true })
	@IsStaff()
	async findAll(@User() user?: UserEntity): Promise<DiscountVoucherDto[]> {
		const res = await this.voucherService.findAllIds();
		const promises = res.map(r => this.voucherService.getDto(r, { isAdmin: user?.isStaff || false }));
		return await Promise.all(promises);
	}

	@Get(':id')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@IsStaff()
	async findOne(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	// @Get('/code/:code')
	// @ApiOkResponse({ type: DiscountVoucherDto })
	// @ApiParam({ name: 'code', type: String })
	// @IsPublic()
	// async findByCode(@Param('code') code: string, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
	// 	const res = await this.voucherService.findByCode({ code: code });
	// 	return this.voucherService.getDto(res.id);
	// }

	@Patch(':id')
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: UpdateDiscountVoucherDto })
	@IsStaff()
	async update(@Param('id', ParseIntPipe) id: number, @Body() updateVoucherDto: UpdateDiscountVoucherDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.update({ id: id, updateVoucherDto: updateVoucherDto });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}


	@Put(':id/products')
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountAddProductsDto })
	@IsStaff()
	async addProducts(@Param('id', ParseIntPipe) id: number, @Body() addProductsDto: DiscountAddProductsDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.addProducts({ id: id, addProductsDto: addProductsDto });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Put(':id/categories')
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountAddCategoriesDto })
	@IsStaff()
	async addCategories(@Param('id', ParseIntPipe) id: number, @Body() addCategoriesDto: DiscountAddCategoriesDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.addCategories({ id: id, addCategoriesDto: addCategoriesDto });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Put(':id/variants')
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountAddVariantsDto })
	@IsStaff()
	async addVariants(@Param('id', ParseIntPipe) id: number, @Body() addVariantsDto: DiscountAddVariantsDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.addVariants({ id: id, addVariantsDto: addVariantsDto });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Put(':id/collections')
	@ApiCreatedResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiBody({ type: DiscountAddCollectionsDto })
	@IsStaff()
	async addCollections(@Param('id', ParseIntPipe) id: number, @Body() addCollectionsDto: DiscountAddCollectionsDto, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.addCollections({ id: id, addCollectionsDto: addCollectionsDto });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@IsStaff()
	async remove(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.remove({ id: id });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id/products/:productId')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'productId', type: Number })
	@IsStaff()
	async removeProduct(@Param('id', ParseIntPipe) id: number, @Param('productId', ParseIntPipe) productId: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.removeProduct({ saleId: id, productId: productId });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id/variants/:variantId')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'variantId', type: Number })
	@IsStaff()
	async removeVariant(@Param('id', ParseIntPipe) id: number, @Param('variantId', ParseIntPipe) variantId: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.removeVariant({ saleId: id, variantId: variantId });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id/categories/:categoryId')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'categoryId', type: Number })
	@IsStaff()
	async removeCategory(@Param('id', ParseIntPipe) id: number, @Param('categoryId', ParseIntPipe) categoryId: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.removeCategory({ saleId: id, categoryId: categoryId });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id/collections/:collectionId')
	@ApiOkResponse({ type: DiscountVoucherDto })
	@ApiParam({ name: 'id', type: Number })
	@ApiParam({ name: 'collectionId', type: Number })
	@IsStaff()
	async removeCollection(@Param('id', ParseIntPipe) id: number, @Param('collectionId', ParseIntPipe) collectionId: number, @User() user?: UserEntity): Promise<DiscountVoucherDto> {
		await this.voucherService.removeCollection({ saleId: id, collectionId: collectionId });
		return this.voucherService.getDto(id, { isAdmin: user?.isStaff || false });
	}
}

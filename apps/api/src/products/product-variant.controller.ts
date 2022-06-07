import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CreateProductVariantDto, ProductVariantDto } from './dto/product-variant.dto';
import { ProductVariantService } from './product-variant.service';

@Controller('products/:productId/variants')
@ApiTags('Product Variants')
@ApiBearerAuth()
export class ProductVariantController {
	constructor(private readonly productVariantService: ProductVariantService) {
	}

	@Post()
	@ApiParam({ type: Number, name: 'productId' })
	@ApiCreatedResponse({ type: ProductVariantDto })
	@ApiBody({ type: CreateProductVariantDto })
	@IsStaff()
	async create(@Param('productId', ParseIntPipe) productId: number, @Body() createProductVariantDto: CreateProductVariantDto, @User() user?: UserEntity) {
		const res = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto });
		return this.productVariantService.getDto(res, { isAdmin: user ? user.isStaff : false });
	}

	@Get()
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: [ProductVariantDto] })
	@IsPublic()
	async findOfProduct(@Param('productId', ParseIntPipe) productId: number, @User() user?: UserEntity): Promise<ProductVariantDto[]> {
		const products = await this.productVariantService.findIdsOfProduct({ productId: productId });
		const promises = products.map(product => this.productVariantService.getDto(product, { isAdmin: user ? user.isStaff : false }));
		return Promise.all(promises);
	}

	@Get(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@IsPublic()
	async getById(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number, @User() user?: UserEntity) {
		return this.productVariantService.getDto(id, { isAdmin: user ? user.isStaff : false });
	}

	@Put(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@ApiBody({ type: CreateProductVariantDto })
	@IsStaff()
	async update(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number, @Body() createProductVariantDto: CreateProductVariantDto, @User() user?: UserEntity) {
		const res = await this.productVariantService.save({ productId: productId, dto: createProductVariantDto, id: id });
		return this.productVariantService.getDto(res, { isAdmin: user ? user.isStaff : false });
	}

	@Delete(':id')
	@ApiParam({ type: Number, name: 'productId' })
	@ApiOkResponse({ type: ProductVariantDto })
	@IsStaff()
	async remove(@Param('productId', ParseIntPipe) productId: number, @Param('id', ParseIntPipe) id: number, @User() user?: UserEntity) {
		const product = this.productVariantService.getDto(id, { isAdmin: user ? user.isStaff : false });
		await this.productVariantService.remove({ id: id });
		return product;
	}
}

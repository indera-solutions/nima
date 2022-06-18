import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CreateProductTypeDto, ProductTypeDto } from './dto/product-type.dto';
import { ProductTypesService } from './product-types.service';

@Controller('product-types')
@ApiTags('Product Types')
@ApiBearerAuth()
export class ProductTypesController {
	constructor(
		private readonly productTypesService: ProductTypesService,
	) {
	}

	@Post()
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiBody({ type: CreateProductTypeDto })
	@IsStaff()
	async create(@Body() createProductTypeDto: CreateProductTypeDto, @User() user?: UserEntity): Promise<ProductTypeDto> {
		const res = await this.productTypesService.save({ dto: createProductTypeDto });
		return ProductTypeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Get()
	@ApiOkResponse({ type: [ProductTypeDto] })
	@IsPublic()
	async findAll(@User() user?: UserEntity): Promise<ProductTypeDto[]> {
		const res = await this.productTypesService.list();
		return res.map(r => ProductTypeDto.prepare(r, { isAdmin: user?.isStaff || false }));
	}

	@Get(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@IsPublic()
	async getById(@Param('productTypeId', ParseIntPipe) id: number, @User() user?: UserEntity): Promise<ProductTypeDto> {
		const res = await this.productTypesService.getById({ id });
		return ProductTypeDto.prepare(res, { isAdmin: user?.isStaff || false });

	}

	@Put(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@ApiBody({ type: CreateProductTypeDto })
	@IsStaff()
	async update(@Param('productTypeId', ParseIntPipe) productTypeId: number, @Body() createProductTypeDto: CreateProductTypeDto, @User() user?: UserEntity): Promise<ProductTypeDto> {
		const res = await this.productTypesService.save({ id: productTypeId, dto: createProductTypeDto });
		return ProductTypeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}

	@Delete(':productTypeId')
	@ApiOkResponse({ type: ProductTypeDto })
	@ApiParam({ type: Number, name: 'productTypeId' })
	@IsStaff()
	async remove(@Param('productTypeId', ParseIntPipe) productTypeId: number, @User() user?: UserEntity): Promise<ProductTypeDto> {
		const res = await this.productTypesService.deleteById({ id: productTypeId });
		return ProductTypeDto.prepare(res, { isAdmin: user?.isStaff || false });
	}
}

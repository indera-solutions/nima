import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	Req,
	ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { ProductFilterParamsDto, ProductFilterResultDto } from './dto/product-filtering.dto';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { FilteringService } from './filtering.service';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
@ApiBearerAuth()
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly filteringService: FilteringService,
	) {
	}

	@Post()
	@ApiCreatedResponse({ type: ProductDto })
	@ApiBody({ type: CreateProductDto })
	@IsStaff()
	async create(@Body() createProductDto: CreateProductDto, @User() user?: UserEntity) {
		const product = await this.productsService.save({ dto: createProductDto });
		return ProductDto.prepare(product, { isAdmin: user?.isStaff || false });
	}

	@Get()
	@ApiOkResponse({ type: ProductFilterResultDto })
	@ApiQuery({ type: () => ProductFilterParamsDto })
	@IsPublic()
	async findAll(@Req() request: Request, @Query(new ValidationPipe({})) query, @Query('filters') filters, @User() user?: UserEntity) {
		const filterObj = plainToInstance(ProductFilterParamsDto, query, { enableImplicitConversion: true });
		return await this.filteringService.productFilterQuery(filterObj, {
			isStaff: user?.isStaff || false,
		});
	}

	@Get('ids')
	@IsPublic()
	@ApiOkResponse({ type: Number, isArray: true })
	async getAllIds(@User() user?: UserEntity) {
		return await this.productsService.getAllIds({
			isStaff: user?.isStaff,
		});
	}

	@Get(':id')
	@ApiOkResponse({ type: ProductDto })
	@IsPublic()
	async getById(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity) {
		const product = await this.productsService.getById({ id: id });
		if ( !product.isPublished && !user?.isStaff ) {
			throw new NotFoundException('PRODUCT_NOT_FOUND');
		}
		return ProductDto.prepare(product, { isAdmin: user?.isStaff || false });
	}

	@Put(':id')
	@ApiOkResponse({ type: ProductDto })
	@ApiBody({ type: CreateProductDto })
	@IsStaff()
	async update(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto, @User() user?: UserEntity) {
		const product = await this.productsService.save({ dto: createProductDto, id: id });
		return ProductDto.prepare(product, { isAdmin: user?.isStaff || false });
	}

	@Delete(':id')
	@ApiOkResponse({ type: ProductDto })
	@IsStaff()
	async remove(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity) {
		const product = await this.productsService.remove({ id: id });
		return ProductDto.prepare(product, { isAdmin: user?.isStaff || false });
	}
}

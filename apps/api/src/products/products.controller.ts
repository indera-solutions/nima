import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductFilterParamsDto, ProductFilterResultDto } from './dto/product-filtering.dto';
import { CreateProductDto, ProductDto } from './dto/product.dto';
import { FilteringService } from './filtering.service';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly filteringService: FilteringService,
	) {
	}

	@Post()
	@ApiCreatedResponse({ type: ProductDto })
	@ApiBody({ type: CreateProductDto })
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	async create(@Body() createProductDto: CreateProductDto) {
		const product = await this.productsService.save({ dto: createProductDto });
		return ProductDto.prepare(product);
	}

	@Get()
	@ApiOkResponse({ type: ProductFilterResultDto })
	@ApiQuery({ type: () => ProductFilterParamsDto })
	async findAll(@Req() request: Request, @Query(new ValidationPipe({})) query, @Query('filters') filters) {
		const filterObj = plainToInstance(ProductFilterParamsDto, query, { enableImplicitConversion: true });
		// if (Array.isArray(filterObj.filters))
		return await this.filteringService.productFilterQuery(filterObj);
	}

	@Get(':id')
	@ApiOkResponse({ type: ProductDto })
	async getById(@Param('id', ParseIntPipe) id: number) {
		const product = await this.productsService.getById({ id: id });
		return ProductDto.prepare(product);
	}

	@Put(':id')
	@ApiOkResponse({ type: ProductDto })
	@ApiBody({ type: CreateProductDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async update(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto) {
		const product = await this.productsService.save({ dto: createProductDto, id: id });
		return ProductDto.prepare(product);
	}

	@Delete(':id')
	@ApiOkResponse({ type: ProductDto })
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async remove(@Param('id', ParseIntPipe) id: number) {
		const product = await this.productsService.remove({ id: id });
		return ProductDto.prepare(product);
	}
}

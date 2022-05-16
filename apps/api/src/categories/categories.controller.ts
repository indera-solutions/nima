import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {
	}

	@Post()
	@ApiBody({ type: CreateCategoryDto })
	@ApiCreatedResponse({ type: CategoryDto })
	async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
		const id = await this.categoriesService.create({ createCategoryDto });
		return await this.categoriesService.getDto(id);
	}

	@Get()
	@ApiQuery({ name: 'depth', description: 'The depth of children to retrieve. Set 0 for only the root categories, -1 for flat array, leave empty for the full tree', required: false })
	@ApiOkResponse({ type: [CategoryDto] })
	async findAll(@Query('depth') depth?: number): Promise<CategoryDto[]> {
		const res = await this.categoriesService.findAll({ depth });
		return res.map(r => this.categoriesService.parseDto(r));
	}

	@Get(':id')
	@ApiOperation({ description: 'Gets a category. Use depth query to control the level of children to retrieve', summary: 'Get a category by id' })
	@ApiParam({ name: 'id', description: 'The id of the category to get' })
	@ApiQuery({ name: 'depth', description: 'The depth of children to retrieve. Set 0 for only the requested category, leave empty for the full tree', required: false })
	@ApiOkResponse({ type: CategoryDto })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async findOne(@Param('id', ParseIntPipe) id: number, @Query('depth') depth?: number): Promise<CategoryDto> {
		const res = await this.categoriesService.findOne({ id, depth });
		return this.categoriesService.parseDto(res);
	}

	@Put(':id')
	@ApiOkResponse({ type: CategoryDto })
	async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
		await this.categoriesService.update({ id, updateCategoryDto });
		return await this.categoriesService.getDto(id);
	}

	@Delete(':id')
	@ApiQuery({ name: 'forceDelete', description: 'Deletes the children subcategories. Default to false.', required: false })
	async remove(@Param('id') id: number, @Query('forceDelete') forceDelete?: boolean) {
		const dto = await this.categoriesService.getDto(id);
		await this.categoriesService.remove({ id, removeChildren: forceDelete });
		return dto;
	}
}

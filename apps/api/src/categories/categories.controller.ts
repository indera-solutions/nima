import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
@ApiBearerAuth()
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {
	}

	@Post()
	@ApiBody({ type: CreateCategoryDto })
	@ApiCreatedResponse({ type: CategoryDto })
	@IsStaff()
	async create(@Body() createCategoryDto: CreateCategoryDto, @User() user?: UserEntity): Promise<CategoryDto> {
		const res: CategoryEntity = await this.categoriesService.create({ createCategoryDto });
		return CategoryDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Get()
	@ApiQuery({ name: 'depth', description: 'The depth of children to retrieve. Set 0 for only the root categories, -1 for flat array, leave empty for the full tree', required: false })
	@ApiOkResponse({ type: [CategoryDto] })
	@IsPublic()
	async findAll(@Query('depth') depth?: number, @User() user?: UserEntity): Promise<CategoryDto[]> {
		const res = await this.categoriesService.findAll({ depth });
		return res.map(r => CategoryDto.prepare(r, { isAdmin: user ? user.isStaff : false }));
	}

	@Get('/slugs/:slug')
	@IsPublic()
	@ApiOperation({ description: 'Gets a category by slug. Use depth query to control the level of children to retrieve', summary: 'Get a category by slug' })
	@ApiParam({ name: 'slug', description: 'The slug of the category to get' })
	@ApiQuery({ name: 'depth', description: 'The depth of children to retrieve. Set 0 for only the requested category, leave empty for the full tree', required: false })
	@ApiOkResponse({ type: CategoryDto })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async findOneBySlug(@Param('slug') slug: string, @Query('depth') depth?: number): Promise<CategoryDto> {
		const res = await this.categoriesService.findOneBySlug({ slug, depth });
		return CategoryDto.prepare(res);
	}

	@Get('/ids')
	@IsPublic()
	@ApiOperation({ description: 'Gets all ids of categories' })
	@ApiOkResponse({ type: Number, isArray: true })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async getAllIds(): Promise<number[]> {
		return await this.categoriesService.getAllIds();
	}


	@Get('/slugs')
	@IsPublic()
	@ApiOperation({ description: 'Gets all slugs of categories' })
	@ApiOkResponse({ type: String, isArray: true })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async getAllSlugs(): Promise<string[]> {
		return await this.categoriesService.getAllSlugs();
	}

	@Get(':id')
	@IsPublic()
	@ApiOperation({ description: 'Gets a category. Use depth query to control the level of children to retrieve', summary: 'Get a category by id' })
	@ApiParam({ name: 'id', description: 'The id of the category to get' })
	@ApiQuery({ name: 'depth', description: 'The depth of children to retrieve. Set 0 for only the requested category, leave empty for the full tree', required: false })
	@ApiOkResponse({ type: CategoryDto })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async findOne(@Param('id', ParseIntPipe) id: number, @Query('depth') depth?: number, @User() user?: UserEntity): Promise<CategoryDto> {
		const res = await this.categoriesService.findOne({ id, depth });
		return CategoryDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Get(':id/ancestors')
	@IsPublic()
	@ApiOperation({ description: 'Gets all the ancestors of a category. Useful for breadcrumbs', summary: 'Get ancestors of category by id' })
	@ApiParam({ name: 'id', description: 'The id of the category to get' })
	@ApiOkResponse({ type: CategoryDto })
	@ApiNotFoundResponse({ description: 'The category does not exists' })
	async findAncestorsById(@Param('id', ParseIntPipe) id: number, @User() user?: UserEntity): Promise<CategoryDto> {
		const res = await this.categoriesService.findAncestors({ id });
		return CategoryDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Put(':id')
	@ApiOkResponse({ type: CategoryDto })
	@IsStaff()
	async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto, @User() user?: UserEntity) {
		const res = await this.categoriesService.update({ id, updateCategoryDto });
		return CategoryDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Delete(':id')
	@ApiQuery({ name: 'forceDelete', description: 'Deletes the children subcategories. Default to false.', required: false })
	@IsStaff()
	async remove(@Param('id') id: number, @Query('forceDelete') forceDelete?: boolean, @User() user?: UserEntity) {
		return this.categoriesService.remove({ id, removeChildren: forceDelete });
	}
}

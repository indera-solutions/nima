import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {
	}

	@Post()
	@ApiBody({ type: CreateCategoryDto })
	@ApiCreatedResponse({ type: CategoryDto })
	async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
		const res: CategoryEntity = await this.categoriesService.create(createCategoryDto);
		return CategoryDto.prepare(res);
	}

	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: CategoryDto })
	async findOne(@Param('id', ParseIntPipe) id: number): Promise<CategoryDto> {
		const res = await this.categoriesService.findOne(id);
		return CategoryDto.prepare(res);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoriesService.remove(+id);
	}
}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/collection.dto';

@Controller('collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {
	}

	@Post()
	create(@Body() createCollectionDto: CreateCollectionDto) {
		return this.collectionsService.create(createCollectionDto);
	}

	@Get()
	findAll() {
		return this.collectionsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.collectionsService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateCollectionDto: UpdateCollectionDto) {
		return this.collectionsService.update(+id, updateCollectionDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.collectionsService.remove(+id);
	}
}

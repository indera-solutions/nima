import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service';
import {
	CollectionDto,
	CreateCollectionDto,
	CreateCollectionProductDto,
	UpdateCollectionDto,
} from './dto/collection.dto';

@Controller('collections')
@ApiTags('Collections')
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiBody({ type: () => CreateCollectionDto })
	async create(@Body() createCollectionDto: CreateCollectionDto): Promise<CollectionDto> {
		const res = await this.collectionsService.create({ createCollectionDto });
		return CollectionDto.prepare(res);
	}

	@Get()
	@ApiOkResponse({ type: () => CollectionDto, isArray: true })
	async findAll(): Promise<CollectionDto[]> {
		const res = await this.collectionsService.findAll();
		return res.map(r => CollectionDto.prepare(r));
	}

	@Get(':collectionId')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	async findOne(@Param('collectionId', ParseIntPipe) collectionId: number): Promise<CollectionDto> {
		const res = await this.collectionsService.getOne({ id: collectionId });
		return CollectionDto.prepare(res);
	}

	@Patch(':collectionId')
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiBody({ type: () => UpdateCollectionDto })
	async update(@Param('collectionId', ParseIntPipe) collectionId: number, @Body() updateCollectionDto: UpdateCollectionDto): Promise<CollectionDto> {
		const res = await this.collectionsService.update({ id: collectionId, updateCollectionDto });
		return CollectionDto.prepare(res);
	}

	@Patch(':collectionId/products')
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiBody({ type: [CreateCollectionProductDto] })
	async addProducts(@Param('collectionId', ParseIntPipe) collectionId: number, @Body() createCollectionProductDtos: CreateCollectionProductDto[]): Promise<CollectionDto> {
		const res = await this.collectionsService.addProducts({ id: collectionId, dtos: createCollectionProductDtos });
		return CollectionDto.prepare(res);
	}

	@Delete(':collectionId')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	async remove(@Param('collectionId', ParseIntPipe) collectionId: number): Promise<CollectionDto> {
		const res = await this.collectionsService.remove({ id: collectionId });
		return CollectionDto.prepare(res);
	}

	@Delete(':collectionId/products/:id')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiParam({ name: 'id', type: Number })
	async removeProduct(@Param('collectionId', ParseIntPipe) collectionId: number, @Param('id', ParseIntPipe) id: number): Promise<CollectionDto> {
		const res = await this.collectionsService.removeProduct({ collectionId: collectionId, id: id });
		return CollectionDto.prepare(res);
	}
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsPublic, IsStaff, User } from '../auth/auth.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { CollectionsService } from './collections.service';
import {
	CollectionDto,
	CreateCollectionDto,
	CreateCollectionProductDto,
	UpdateCollectionDto,
} from './dto/collection.dto';

@Controller('collections')
@ApiTags('Collections')
@ApiBearerAuth()
export class CollectionsController {
	constructor(private readonly collectionsService: CollectionsService) {
	}

	@Post()
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiBody({ type: () => CreateCollectionDto })
	@IsStaff()
	async create(@Body() createCollectionDto: CreateCollectionDto, @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.create({ createCollectionDto });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Get()
	@ApiOkResponse({ type: () => CollectionDto, isArray: true })
	@IsPublic()
	async findAll(@User() user?: UserEntity): Promise<CollectionDto[]> {
		const res = await this.collectionsService.findAll();
		return res.map(r => CollectionDto.prepare(r, { isAdmin: user ? user.isStaff : false }));
	}

	@Get('/slug/:slug')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'slug', type: String })
	async findOneBySlug(@Param('slug') slug: string): Promise<CollectionDto> {
		const res = await this.collectionsService.getOneBySlug({ slug });
		return CollectionDto.prepare(res);
	}

	@Get(':collectionId')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@IsPublic()
	async findOne(@Param('collectionId', ParseIntPipe) collectionId: number, @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.getOne({ id: collectionId });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Patch(':collectionId')
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiBody({ type: () => UpdateCollectionDto })
	@IsStaff()
	async update(@Param('collectionId', ParseIntPipe) collectionId: number, @Body() updateCollectionDto: UpdateCollectionDto, @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.update({ id: collectionId, updateCollectionDto });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Post(':collectionId/products')
	@ApiCreatedResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiBody({ type: [CreateCollectionProductDto] })
	@IsStaff()
	async addProducts(@Param('collectionId', ParseIntPipe) collectionId: number, @Body() createCollectionProductDtos: CreateCollectionProductDto[], @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.addProducts({ id: collectionId, dtos: createCollectionProductDtos });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Delete(':collectionId')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@IsStaff()
	async remove(@Param('collectionId', ParseIntPipe) collectionId: number, @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.remove({ id: collectionId });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}

	@Delete(':collectionId/products/:productId')
	@ApiOkResponse({ type: () => CollectionDto })
	@ApiParam({ name: 'collectionId', type: Number })
	@ApiParam({ name: 'productId', type: Number })
	@IsStaff()
	async removeProduct(@Param('collectionId') collectionId: number, @Param('productId') productId: number, @User() user?: UserEntity): Promise<CollectionDto> {
		const res = await this.collectionsService.removeProduct({ collectionId: collectionId, productId: productId });
		return CollectionDto.prepare(res, { isAdmin: user ? user.isStaff : false });
	}
}

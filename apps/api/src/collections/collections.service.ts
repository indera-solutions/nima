import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { MediaEntity } from '../core/entities/media.entity';
import { MediaService } from '../core/media/media.service';
import { ProductsService } from '../products/products.service';
import { CreateCollectionDto, CreateCollectionProductDto, UpdateCollectionDto } from './dto/collection.dto';
import { CollectionEntity } from './entities/collection.entity';
import { CollectionProductsRepository } from './repositories/collection-products.repository';
import { CollectionRepository } from './repositories/collection.repository';

@Injectable()
export class CollectionsService {
	constructor(
		private collectionRepository: CollectionRepository,
		private collectionProductsRepository: CollectionProductsRepository,
		private productsService: ProductsService,
		private mediaService: MediaService,
	) {
	}

	@Transactional()
	async create(params: { createCollectionDto: CreateCollectionDto }): Promise<CollectionEntity> {
		const { createCollectionDto } = params;
		let backgroundImage: MediaEntity;
		if ( createCollectionDto.backgroundImageId ) backgroundImage = await this.mediaService.getById({ id: createCollectionDto.backgroundImageId });

		const collection = await this.collectionRepository.save({ ...createCollectionDto, backgroundImage: backgroundImage });
		await this.addProductsToCollection(collection, createCollectionDto.products);

		return this.getOne({ id: collection.id });
	}

	async findAll(): Promise<CollectionEntity[]> {
		return this.collectionRepository.getFullObjects();
	}

	async getOne(params: { id: number }): Promise<CollectionEntity> {
		const res = await this.collectionRepository.getFullObject(params.id);
		if ( !res ) throw new NotFoundException('COLLECTION_NOT_FOUND');
		return res;
	}

	async update(params: { id: number, updateCollectionDto: UpdateCollectionDto }): Promise<CollectionEntity> {
		const { id, updateCollectionDto } = params;
		let backgroundImage: MediaEntity;
		if ( updateCollectionDto.backgroundImageId ) {
			backgroundImage = await this.mediaService.getById({ id: updateCollectionDto.backgroundImageId });
			updateCollectionDto['backgroundImage'] = backgroundImage;
		}
		await this.collectionRepository.update(id, updateCollectionDto);
		return this.getOne({ id: id });
	}

	async addProducts(params: { id: number, dtos: CreateCollectionProductDto[] }): Promise<CollectionEntity> {
		const { dtos, id } = params;

		const collection = await this.getOne({ id: id });

		await this.addProductsToCollection(collection, dtos);
		return this.getOne({ id: collection.id });
	}

	async remove(params: { id: number }): Promise<CollectionEntity> {
		const { id } = params;
		const collection = await this.getOne({ id: id });
		await this.collectionRepository.deleteById(id);
		return collection;
	}

	async removeProduct(params: { id: number, collectionId: number }): Promise<CollectionEntity> {
		const { id, collectionId } = params;
		const collection = await this.getOne({ id: collectionId });
		await this.collectionProductsRepository.deleteById(id);
		return collection;
	}

	private async addProductsToCollection(collection: CollectionEntity, products: CreateCollectionProductDto[]) {
		for ( const product of products ) {
			const productEntity = await this.productsService.getById({ id: product.productId });
			await this.collectionProductsRepository.insert({ collection: collection, sortOrder: product.sortOrder, product: productEntity });
		}
	}
}

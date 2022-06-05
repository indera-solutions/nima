import { Injectable, NotFoundException } from '@nestjs/common';
import { getSlug } from '@nima-cms/utils';
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
		if ( !createCollectionDto.slug ) {
			createCollectionDto.slug = getSlug(createCollectionDto.name.en || createCollectionDto.name.el || '');
		}
		const collection = await this.collectionRepository.save({ ...createCollectionDto, backgroundImage: backgroundImage });
		await this.addProductsToCollection(collection, createCollectionDto.products);

		return this.getOne({ id: collection.id });
	}

	async findAll(): Promise<CollectionEntity[]> {
		return this.collectionRepository.getFullObjects();
	}

	async getOneBySlug(params: { slug: string }): Promise<CollectionEntity> {
		const id = await this.collectionRepository.getIdBySlug(params.slug);
		if ( !id ) throw new NotFoundException('COLLECTION_NOT_FOUND');
		return await this.getOne({ id });
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
		} else {
			updateCollectionDto['backgroundImage'] = undefined;
		}
		delete updateCollectionDto.backgroundImageId;
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

	async removeProduct(params: { productId: number, collectionId: number }): Promise<CollectionEntity> {
		const { productId, collectionId } = params;
		const collection = await this.getOne({ id: collectionId });
		await this.collectionProductsRepository.deleteProductFromCollection(collectionId, productId);
		return collection;
	}

	private async addProductsToCollection(collection: CollectionEntity, products: CreateCollectionProductDto[]) {
		for ( const product of products ) {
			const productEntity = await this.productsService.getById({ id: product.productId });
			await this.collectionProductsRepository.insert({ collection: collection, sortOrder: product.sortOrder, product: productEntity });
		}
	}
}

import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoriesService } from '../categories/categories.service';
import { CategoryDto } from '../categories/dto/category.dto';
import { CollectionsService } from '../collections/collections.service';
import { CollectionDto } from '../collections/dto/collection.dto';
import { ProductDto } from '../products/dto/product.dto';
import { ProductVariantService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import {
	CreateDiscountSaleDto,
	DiscountAddCategoriesDto,
	DiscountAddCollectionsDto,
	DiscountAddProductsDto,
	DiscountAddVariantsDto,
	DiscountSaleDto,
	UpdateDiscountDto,
} from './dto/discount-sale.dto';
import { DiscountSaleEntity } from './entities/discount-sale.entity';
import { DiscountSaleRepository } from './repositories/discount-sale.repository';
import dayjs = require('dayjs');

@Injectable()
export class DiscountSalesService {
	constructor(
		private discountSaleRepository: DiscountSaleRepository,
		@Inject(forwardRef(() => ProductsService))
		private productsService: ProductsService,
		@Inject(forwardRef(() => ProductVariantService))
		private variantService: ProductVariantService,
		private categoriesService: CategoriesService,
		@Inject(forwardRef(() => CollectionsService))
		private collectionsService: CollectionsService,
	) {
	}

	async create(params: { createDiscountDto: CreateDiscountSaleDto }): Promise<number> {
		const { createDiscountDto } = params;

		const res = await this.discountSaleRepository.insert(createDiscountDto);

		return res.identifiers[0].id;
	}

	async findAll(): Promise<DiscountSaleEntity[]> {
		return this.discountSaleRepository.getFullObjects();
	}

	async findAllIds(): Promise<number[]> {
		return this.discountSaleRepository.getAllIds();
	}

	async findDiscountsOfVariant(params: { variantId: number, productId: number, categoryId: number, collectionIds: number[] }): Promise<DiscountSaleEntity[]> {
		const { variantId, productId, collectionIds, categoryId } = params;
		const res = await this.findAll();
		const discounts: DiscountSaleEntity[] = [];
		const now = dayjs();

		for ( const discount of res ) {
			const startDateFlag = discount.startDate && dayjs(discount.startDate).isAfter(now);
			const endDateFlag = discount.endDate && dayjs(discount.endDate).isBefore(now);
			if ( startDateFlag || endDateFlag ) continue;
			const variantFlag = discount.variants.map(v => v.id).includes(variantId);
			const productFlag = discount.products.map(p => p.id).includes(productId);
			const categoryFlag = discount.categories.map(c => c.id).includes(categoryId);
			const discountCollectionIds = discount.collections.map(c => c.id);
			let collectionFlag = false;
			for ( const collectionId of collectionIds ) {
				if ( discountCollectionIds.includes(collectionId) ) collectionFlag = true;
			}
			if ( variantFlag || productFlag || categoryFlag || collectionFlag ) {
				discounts.push(discount);
			}
		}
		return discounts;
	}

	async getVariantDiscountMap(): Promise<{ [variantId: number]: DiscountSaleEntity[] }> {
		const discounts = await this.findAll();
		const map: { [variantId: number]: DiscountSaleEntity[] } = {};
		for ( const discount of discounts ) {
			const variantIds = discount.variants.map(v => v.id);
			const productIds = discount.products.map(p => p.id);
			const categoryIds = discount.categories.map(c => c.id);
			const collectionIds = discount.collections.map(c => c.id);
			for ( const collectionId of collectionIds ) {
				const collection = await this.collectionsService.getOne({ id: collectionId });
				for ( const product of collection.products ) {
					if ( !productIds.includes(product.product.id) ) productIds.push(product.product.id);
				}
			}
			for ( const categoryId of categoryIds ) {
				const children = await this.categoriesService.listIdsOfChildren({ id: categoryId });
				for ( const id of [...children, categoryId] ) {
					const products = await this.productsService.getOfCategory({ categoryId: id });
					products.forEach(p => productIds.includes(p.id) ? undefined : productIds.push(p.id));
				}
			}
			for ( const productId of productIds ) {
				const variants = await this.variantService.findOfProduct({ productId: productId });
				variants.forEach(v => variantIds.includes(v.id) ? undefined : variantIds.push(v.id));
			}
			for ( const variantId of variantIds ) {
				if ( !map[variantId] ) map[variantId] = [];
				map[variantId].push(discount);
			}
		}
		return map;
	}

	async updateDiscountPricesOfSale(params: { saleId: number }) {
		const saleMap = await this.getVariantDiscountMap();
		const discountedVariantIds = [];
		for ( const variantId in saleMap ) {
			const discountIds = saleMap[variantId].map(d => d.id);
			if ( discountIds.includes(params.saleId) ) discountedVariantIds.push(variantId);
		}
		await Promise.all(discountedVariantIds.map(variantId => this.variantService.syncVariantDiscountValue({ variantId })));
	}

	async update(params: { id: number, updateDiscountDto: UpdateDiscountDto }): Promise<void> {
		const { id, updateDiscountDto } = params;
		await this.discountSaleRepository.update(id, updateDiscountDto);
		await this.updateDiscountPricesOfSale({ saleId: id });
	}

	@Transactional()
	async addProducts(params: { id: number, addProductsDto: DiscountAddProductsDto }): Promise<void> {
		const { addProductsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.productsService.findByIds({ ids: addProductsDto.productIds });
		res.products.push(...products);
		await this.discountSaleRepository.save(res);
		await this.updateDiscountPricesOfSale({ saleId: id });

	}

	@Transactional()
	async addCollections(params: { id: number, addCollectionsDto: DiscountAddCollectionsDto }): Promise<void> {
		const { addCollectionsDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const collectionId of addCollectionsDto.collectionIds ) {
			const temp = await this.collectionsService.getOne({ id: collectionId });
			res.collections.push(temp);
		}
		await this.discountSaleRepository.save(res);
		await this.updateDiscountPricesOfSale({ saleId: id });

	}

	@Transactional()
	async addCategories(params: { id: number, addCategoriesDto: DiscountAddCategoriesDto }): Promise<void> {
		const { addCategoriesDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const categoryId of addCategoriesDto.categoryIds ) {
			const temp = await this.categoriesService.findOne({ id: categoryId, depth: 0 });
			res.categories.push(temp);
		}
		await this.discountSaleRepository.save(res);
		await this.updateDiscountPricesOfSale({ saleId: id });

	}

	@Transactional()
	async addVariants(params: { id: number, addVariantsDto: DiscountAddVariantsDto }): Promise<void> {
		const { addVariantsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.variantService.findByIds({ ids: addVariantsDto.variantIds });
		res.variants.push(...products);
		await this.discountSaleRepository.save(res);
		await this.updateDiscountPricesOfSale({ saleId: id });

	}

	async remove(params: { id: number }): Promise<void> {
		await this.findOne({ id: params.id });
		await this.discountSaleRepository.deleteById(params.id);
		await this.updateDiscountPricesOfSale({ saleId: params.id });

	}

	async removeProduct(params: { saleId: number, productId: number }): Promise<void> {
		const { saleId, productId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteProduct(productId, saleId);
		await this.updateDiscountPricesOfSale({ saleId: saleId });

	}

	async removeCategory(params: { saleId: number, categoryId: number }): Promise<void> {
		const { saleId, categoryId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteCategory(categoryId, saleId);
		await this.updateDiscountPricesOfSale({ saleId: saleId });

	}

	async removeVariant(params: { saleId: number, variantId: number }): Promise<void> {
		const { saleId, variantId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteVariant(variantId, saleId);
		await this.updateDiscountPricesOfSale({ saleId: saleId });

	}

	async removeCollection(params: { saleId: number, collectionId: number }): Promise<void> {
		const { saleId, collectionId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteCollection(collectionId, saleId);
		await this.updateDiscountPricesOfSale({ saleId: saleId });

	}

	async getDto(id: number, options?: { isAdmin?: boolean }): Promise<DiscountSaleDto> {
		const entity = await this.discountSaleRepository.getFullObject(id);
		const variantPromises = entity.variants.map(v => this.variantService.getDto(v.id, options));
		const variants = await Promise.all(variantPromises);
		return {
			name: entity.name,
			id: entity.id,
			products: entity.products.map(p => ProductDto.prepare(p)),
			categories: entity.categories.map(c => CategoryDto.prepare(c)),
			variants: variants,
			collections: entity.collections.map(c => CollectionDto.prepare(c)),
			updatedAt: entity.updatedAt,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			discountType: entity.discountType,
			created: entity.created,
			endDate: entity.endDate,
			startDate: entity.startDate,
			discountValue: entity.discountValue,
		};
	}

	private async findOne(params: { id: number }): Promise<DiscountSaleEntity> {
		const res = await this.discountSaleRepository.getFullObject(params.id);
		if ( !res ) throw new NotFoundException('SALE_NOT_FOUND');
		return res;
	}
}

import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getRandomString } from '@nima-cms/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoriesService } from '../categories/categories.service';
import { CategoryDto } from '../categories/dto/category.dto';
import { CollectionsService } from '../collections/collections.service';
import { CollectionDto } from '../collections/dto/collection.dto';
import { ProductDto } from '../products/dto/product.dto';
import { ProductVariantService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import {
	DiscountAddCategoriesDto,
	DiscountAddCollectionsDto,
	DiscountAddProductsDto,
	DiscountAddVariantsDto,
} from './dto/discount-sale.dto';
import { CreateDiscountVoucherDto, DiscountVoucherDto, UpdateDiscountVoucherDto } from './dto/discount-voucher.dto';
import { DiscountVoucherEntity } from './entities/discount-voucher.entity';
import { DiscountVoucherRepository } from './repositories/discount-voucher.repository';

@Injectable()
export class DiscountVoucherService {
	constructor(
		private voucherRepository: DiscountVoucherRepository,
		@Inject(forwardRef(() => ProductsService))
		private productsService: ProductsService,
		@Inject(forwardRef(() => ProductVariantService))
		private variantService: ProductVariantService,
		private categoriesService: CategoriesService,
		@Inject(forwardRef(() => CollectionsService))
		private collectionsService: CollectionsService,
	) {
	}

	async create(params: { createDiscountVoucherDto: CreateDiscountVoucherDto }): Promise<number> {
		const { createDiscountVoucherDto } = params;
		if ( !createDiscountVoucherDto.code ) createDiscountVoucherDto.code = getRandomString(10);
		const res = await this.voucherRepository.insert(createDiscountVoucherDto);
		return res.identifiers[0].id;
	}

	async findAll(): Promise<DiscountVoucherEntity[]> {
		return this.voucherRepository.getFullObjects();
	}

	async findAllIds(): Promise<number[]> {
		return this.voucherRepository.getAllIds();
	}

	async findByToken(params: { token: string }): Promise<DiscountVoucherEntity> {
		const res = await this.voucherRepository.findByCode(params.token);
		if ( !res ) throw new NotFoundException('VOUCHER_NOT_FOUND');
		return res;
	}

	@Transactional()
	async addProducts(params: { id: number, addProductsDto: DiscountAddProductsDto }): Promise<void> {
		const { addProductsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.productsService.findByIds({ ids: addProductsDto.productIds });
		res.products.push(...products);
		await this.voucherRepository.save(res);
	}

	@Transactional()
	async addCollections(params: { id: number, addCollectionsDto: DiscountAddCollectionsDto }): Promise<void> {
		const { addCollectionsDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const collectionId of addCollectionsDto.collectionIds ) {
			const temp = await this.collectionsService.getOne({ id: collectionId });
			res.collections.push(temp);
		}
		await this.voucherRepository.save(res);
	}

	@Transactional()
	async addCategories(params: { id: number, addCategoriesDto: DiscountAddCategoriesDto }): Promise<void> {
		const { addCategoriesDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const categoryId of addCategoriesDto.categoryIds ) {
			const temp = await this.categoriesService.findOne({ id: categoryId, depth: 0 });
			res.categories.push(temp);
		}
		await this.voucherRepository.save(res);
	}

	@Transactional()
	async addVariants(params: { id: number, addVariantsDto: DiscountAddVariantsDto }): Promise<void> {
		const { addVariantsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.variantService.findByIds({ ids: addVariantsDto.variantIds });
		res.variants.push(...products);
		await this.voucherRepository.save(res);
	}

	async update(params: { id: number, updateVoucherDto: UpdateDiscountVoucherDto }): Promise<void> {
		const { id, updateVoucherDto } = params;
		await this.voucherRepository.update(id, updateVoucherDto);
	}

	async getDto(id: number, options?: { isAdmin?: boolean }): Promise<DiscountVoucherDto> {
		const entity = await this.voucherRepository.getFullObject(id);
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
			discountValueType: entity.discountValueType,
			created: entity.created,
			endDate: entity.endDate,
			startDate: entity.startDate,
			code: entity.code,
			voucherType: entity.voucherType,
			applyOncePerCustomer: entity.applyOncePerCustomer,
			applyOncePerOrder: entity.applyOncePerCustomer,
			minCheckoutItemsQuantity: entity.minCheckoutItemsQuantity,
			onlyForStaff: entity.onlyForStaff,
			used: entity.used,
			usageLimit: entity.usageLimit,
			discountValue: entity.discountValue,
			minSpentAmount: entity.minSpentAmount,
		};
	}

	async remove(params: { id: number }): Promise<void> {
		await this.findOne({ id: params.id });
		await this.voucherRepository.deleteById(params.id);
	}

	async removeProduct(params: { saleId: number, productId: number }): Promise<void> {
		const { saleId, productId } = params;
		await this.findOne({ id: saleId });
		await this.voucherRepository.deleteProduct(productId, saleId);
	}

	async removeCategory(params: { saleId: number, categoryId: number }): Promise<void> {
		const { saleId, categoryId } = params;
		await this.findOne({ id: saleId });
		await this.voucherRepository.deleteCategory(categoryId, saleId);
	}

	async removeVariant(params: { saleId: number, variantId: number }): Promise<void> {
		const { saleId, variantId } = params;
		await this.findOne({ id: saleId });
		await this.voucherRepository.deleteVariant(variantId, saleId);
	}

	async removeCollection(params: { saleId: number, collectionId: number }): Promise<void> {
		const { saleId, collectionId } = params;
		await this.findOne({ id: saleId });
		await this.voucherRepository.deleteCollection(collectionId, saleId);
	}

	private async findOne(params: { id: number }): Promise<DiscountVoucherEntity> {
		const res = await this.voucherRepository.getFullObject(params.id);
		if ( !res ) throw new NotFoundException('SALE_NOT_FOUND');
		return res;
	}
}

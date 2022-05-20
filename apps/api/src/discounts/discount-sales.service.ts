import { Injectable, NotFoundException } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoriesService } from '../categories/categories.service';
import { CollectionsService } from '../collections/collections.service';
import { ProductVariantService } from '../products/product-variant.service';
import { ProductsService } from '../products/products.service';
import {
	CreateDiscountSaleDto,
	DiscountSaleAddCategoriesDto,
	DiscountSaleAddCollectionsDto,
	DiscountSaleAddProductsDto,
	DiscountSaleAddVariantsDto,
	UpdateDiscountDto,
} from './dto/discount-sale.dto';
import { DiscountSaleEntity } from './entities/discount-sale.entity';
import { DiscountSaleRepository } from './repositories/discount-sale.repository';

@Injectable()
export class DiscountSalesService {
	constructor(
		private discountSaleRepository: DiscountSaleRepository,
		private productsService: ProductsService,
		private variantService: ProductVariantService,
		private categoriesService: CategoriesService,
		private collectionsService: CollectionsService,
	) {
	}

	async create(params: { createDiscountDto: CreateDiscountSaleDto }): Promise<DiscountSaleEntity> {
		const { createDiscountDto } = params;

		const res = await this.discountSaleRepository.insert(createDiscountDto);

		return this.findOne({ id: res.identifiers[0].id });
	}

	async findAll(): Promise<DiscountSaleEntity[]> {
		return this.discountSaleRepository.getFullObjects();
	}

	async findOne(params: { id: number }): Promise<DiscountSaleEntity> {
		const res = await this.discountSaleRepository.getFullObject(params.id);
		if ( !res ) throw new NotFoundException('SALE_NOT_FOUND');
		return res;
	}

	async update(params: { id: number, updateDiscountDto: UpdateDiscountDto }): Promise<DiscountSaleEntity> {
		const { id, updateDiscountDto } = params;
		await this.discountSaleRepository.update(id, updateDiscountDto);

		return this.findOne({ id: id });
	}

	@Transactional()
	async addProducts(params: { id: number, addProductsDto: DiscountSaleAddProductsDto }): Promise<DiscountSaleEntity> {
		const { addProductsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.productsService.findByIds({ ids: addProductsDto.productIds });
		res.products.push(...products);
		await this.discountSaleRepository.save(res);
		return this.findOne({ id: id });
	}

	@Transactional()
	async addCollections(params: { id: number, addCollectionsDto: DiscountSaleAddCollectionsDto }): Promise<DiscountSaleEntity> {
		const { addCollectionsDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const collectionId of addCollectionsDto.collectionIds ) {
			const temp = await this.collectionsService.getOne({ id: collectionId });
			res.collections.push(temp);
		}
		await this.discountSaleRepository.save(res);
		return this.findOne({ id: id });
	}

	@Transactional()
	async addCategories(params: { id: number, addCategoriesDto: DiscountSaleAddCategoriesDto }): Promise<DiscountSaleEntity> {
		const { addCategoriesDto, id } = params;

		const res = await this.findOne({ id: id });

		for ( const categoryId of addCategoriesDto.categoryIds ) {
			const temp = await this.categoriesService.findOne({ id: categoryId, depth: 0 });
			res.categories.push(temp);
		}
		await this.discountSaleRepository.save(res);
		return this.findOne({ id: id });
	}

	@Transactional()
	async addVariants(params: { id: number, addVariantsDto: DiscountSaleAddVariantsDto }): Promise<DiscountSaleEntity> {
		const { addVariantsDto, id } = params;

		const res = await this.findOne({ id: id });

		const products = await this.variantService.findByIds({ ids: addVariantsDto.variantIds });
		res.variants.push(...products);
		await this.discountSaleRepository.save(res);
		return this.findOne({ id: id });
	}

	async remove(params: { id: number }): Promise<DiscountSaleEntity> {
		const res = await this.findOne({ id: params.id });
		await this.discountSaleRepository.deleteById(params.id);
		return res;
	}

	async removeProduct(params: { saleId: number, productId: number }): Promise<DiscountSaleEntity> {
		const { saleId, productId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteProduct(productId, saleId);
		return this.findOne({ id: saleId });
	}

	async removeCategory(params: { saleId: number, categoryId: number }): Promise<DiscountSaleEntity> {
		const { saleId, categoryId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteCategory(categoryId, saleId);
		return this.findOne({ id: saleId });
	}

	async removeVariant(params: { saleId: number, variantId: number }): Promise<DiscountSaleEntity> {
		const { saleId, variantId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteVariant(variantId, saleId);
		return this.findOne({ id: saleId });
	}

	async removeCollection(params: { saleId: number, collectionId: number }): Promise<DiscountSaleEntity> {
		const { saleId, collectionId } = params;
		await this.findOne({ id: saleId });
		await this.discountSaleRepository.deleteCollection(collectionId, saleId);
		return this.findOne({ id: saleId });
	}
}

import { Injectable } from '@nestjs/common';
import { runAsyncObject } from '@nima-cms/utils';
import { AttributeValuesService } from '../attributes/attribute-values.service';
import { CategoriesService } from '../categories/categories.service';
import { CollectionsService } from '../collections/collections.service';
import { CollectionDto } from '../collections/dto/collection.dto';
import {
	AttributeDrillDownDto,
	ProductFilterParamsDto,
	ProductFilterResultDto,
	ProductQueryFilterDto,
	ProductSorting,
} from './dto/product-filtering.dto';
import { ProductDto } from './dto/product.dto';
import { ProductVariantService } from './product-variant.service';
import { ProductsService } from './products.service';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { ProductRepository } from './repositories/product.repository';

const emptyRes: ProductFilterResultDto = {
	items: [],
	pageNumber: 0,
	pageSize: 0,
	totalCount: 0,
	attributeDrillDown: [],
	maxPrice: 0,
	minPrice: 0,
	selectedMaxPrice: 0,
	selectedMinPrice: 0,
	collections: [],
};

@Injectable()
export class FilteringService {
	constructor(
		private productRepository: ProductRepository,
		private productService: ProductsService,
		private productVariantRepository: ProductVariantRepository,
		private productVariantService: ProductVariantService,
		private categoriesService: CategoriesService,
		private attributeValuesService: AttributeValuesService,
		private collectionService: CollectionsService,
	) {
	}

	async productFilterQuery(params: ProductFilterParamsDto, options: { isStaff: boolean }): Promise<ProductFilterResultDto> {
		let categoryIdArray, collectionId, products = [], attributeDrillDown = [];
		const ids = [];
		let minPrice = Number.MAX_SAFE_INTEGER, maxPrice = Number.MIN_SAFE_INTEGER;
		const take = params.itemsPerPage || 20;
		const skip = ((params.page || 1) - 1) * take;
		if ( !params.sorting ) {
			params.sorting = ProductSorting.NAME_ASC;
		}

		if ( params.categoryId ) {
			categoryIdArray = await this.findCategoryChildrenIds(params.categoryId);
		}

		if ( params.collectionId ) {
			collectionId = params.collectionId;
		}
		const filters = await this.getFiltersFromValues(params.attributeValueIds);
		let collections = [];

		if ( !params.variants ) {
			const result = await this.productRepository.findFilteredProductIds(collectionId, categoryIdArray, filters, params.search, options.isStaff);

			if ( result.length === 0 )
				return emptyRes;

			// const lowestPrices = await this.productService.getLowestPrices(result);

			for ( const product of result ) {
				let underMax = true, overMin = true;
				const lowestPrice = product.discountedPrice || product.priceAmount;
				if ( params.maxPrice ) underMax = lowestPrice <= params.maxPrice;
				if ( params.minPrice ) overMin = lowestPrice >= params.minPrice;
				if ( underMax && overMin ) ids.push(product.id);
				if ( lowestPrice < minPrice ) minPrice = lowestPrice;
				if ( lowestPrice > maxPrice ) maxPrice = lowestPrice;
			}
			if ( ids.length === 0 ) return emptyRes;
			const { tempProducts, rawDrillDown, collectionTemp } = await runAsyncObject({
				tempProducts: this.productRepository.findByIdsWithSorting(ids, skip, take, params.sorting, params.language),
				rawDrillDown: this.attributeValuesService.attributeDrillDown({ ids: ids }),
				collectionTemp: this.collectionService.getCollectionsOfProductIds({ productIds: ids }),
			});
			products = tempProducts;
			attributeDrillDown = this.attributeFilterRawArrayToDrillDownArray(rawDrillDown);
			collections = collectionTemp;

		} else {
			const result = await this.productVariantRepository.findFilteredVariantIds(collectionId, categoryIdArray, filters, params.search);

			if ( result.length === 0 )
				return emptyRes;

			const lowestPrices = await this.productVariantService.getLowestPrices(result);

			for ( const resultElement of lowestPrices ) {
				let underMax = true, overMin = true;
				if ( params.maxPrice ) underMax = resultElement.lowestPrice <= params.maxPrice;
				if ( params.minPrice ) overMin = resultElement.lowestPrice >= params.minPrice;
				if ( underMax && overMin ) ids.push(resultElement.id);
				if ( resultElement.lowestPrice < minPrice ) minPrice = resultElement.lowestPrice;
				if ( resultElement.lowestPrice > maxPrice ) maxPrice = resultElement.lowestPrice;
			}
			if ( ids.length === 0 ) return emptyRes;
			products = await this.productVariantRepository.findByIdsWithSorting(ids, skip, take, params.sorting, params.language);
			const rawDrillDown = await this.productVariantRepository.attributeDrillDown(ids);
			attributeDrillDown = this.attributeFilterRawArrayToDrillDownArray(rawDrillDown);
		}

		return {
			items: products.map(p => params.variants ? ProductDto.prepare(p.product, { isAdmin: options.isStaff }) : ProductDto.prepare(p, { isAdmin: options.isStaff })),
			totalCount: ids.length,
			pageSize: params.itemsPerPage,
			pageNumber: params.page,
			attributeDrillDown: attributeDrillDown,
			minPrice,
			maxPrice,
			selectedMinPrice: params.minPrice || 0,
			selectedMaxPrice: params.maxPrice || 0,
			collections: collections.map(c => CollectionDto.prepare(c, { isAdmin: options.isStaff })),
		};
	}

	private async findCategoryChildrenIds(id: number): Promise<number[]> {
		const categoryIdArray: number[] = [id];
		const childrenIds = await this.categoriesService.listIdsOfChildren({ id: id });
		for ( const cid of childrenIds ) {
			const temp = await this.findCategoryChildrenIds(cid);
			categoryIdArray.push(...temp);
		}
		return categoryIdArray;
	}

	private attributeFilterRawArrayToDrillDownArray(rawDrillDown: { aSlug: string; aId: number; avSlug: string; avId: number; count: string }[]): AttributeDrillDownDto[] {
		const fieldMap: { [id: string]: AttributeDrillDownDto } = {};

		rawDrillDown.forEach((rawField) => {
			const { count, aId, aSlug, avSlug, avId } = rawField;
			if ( !fieldMap[aId] ) {
				fieldMap[aId] = { attributeId: aId, attributeSlug: aSlug, fieldValues: [] };
			}
			fieldMap[aId].fieldValues.push({
				attributeValueSlug: avSlug,
				attributeValueId: +avId,
				count: +count,
			});
		});
		return Object.values(fieldMap);
	}

	private async getFiltersFromValues(attributeValueIds?: number[]): Promise<ProductQueryFilterDto[]> {
		if ( !attributeValueIds || attributeValueIds.length === 0 ) return [];
		const attributeMap: { [T: number]: string[] } = {};
		const res = await this.attributeValuesService.getSlugAndAttributeSlugOfValues(attributeValueIds);
		for ( const value of res ) {
			if ( attributeMap[value.attributeSlug] ) {
				attributeMap[value.attributeSlug].push(value.value);
			} else {
				attributeMap[value.attributeSlug] = [value.value];
			}
		}

		const filter: ProductQueryFilterDto[] = [];
		Object.keys(attributeMap).forEach(attributeSlug => {
			filter.push({
				attributeSlug: attributeSlug,
				values: attributeMap[attributeSlug],
			});
		});
		return filter;
	}
}

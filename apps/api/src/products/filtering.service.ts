import { Injectable } from '@nestjs/common';
import { AttributeValuesService } from '../attributes/attribute-values.service';
import { CategoriesService } from '../categories/categories.service';
import { AttributeDrillDownDto, ProductFilterParamsDto, ProductFilterResultDto } from './dto/product-filtering.dto';
import { ProductDto } from './dto/product.dto';
import { ProductVariantRepository } from './entities/product-variant.repository';
import { ProductRepository } from './entities/product.repository';

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
};

@Injectable()
export class FilteringService {
	constructor(
		private productRepository: ProductRepository,
		private productVariantRepository: ProductVariantRepository,
		private categoriesService: CategoriesService,
		private attributeValuesService: AttributeValuesService,
	) {
	}

	async productFilterQuery(params: ProductFilterParamsDto): Promise<ProductFilterResultDto> {
		let categoryIdArray, collectionId, products = [], ids = [], attributeDrillDown = [];
		let minPrice = Number.MAX_SAFE_INTEGER, maxPrice = Number.MIN_SAFE_INTEGER;
		const take = params.itemsPerPage;
		const skip = ((params.page || 1) - 1) * take;

		if ( params.categoryId ) {
			categoryIdArray = await this.findCategoryChildrenIds(params.categoryId);
		}

		if ( params.collectionId ) {
			collectionId = params.collectionId;
		}


		if ( !params.variants ) {
			const result = await this.productRepository.findFilteredProductIds(collectionId, categoryIdArray, params.filters);

			if ( result.length === 0 )
				return emptyRes;

			for ( const resultElement of result ) {
				let underMax = true, overMin = true;
				if ( params.maxPrice ) underMax = resultElement.price <= params.maxPrice;
				if ( params.minPrice ) overMin = resultElement.price >= params.minPrice;
				if ( underMax && overMin ) ids.push(resultElement.id);
				if ( resultElement.price < minPrice ) minPrice = resultElement.price;
				if ( resultElement.price > maxPrice ) maxPrice = resultElement.price;
			}
			ids = result.map(res => res.id);
			products = await this.productRepository.findByIdsWithSorting(ids, skip, take, params.sorting, params.language);
			const rawDrillDown = await this.attributeValuesService.attributeDrillDown({ ids: ids });
			attributeDrillDown = this.attributeFilterRawArrayToDrillDownArray(rawDrillDown);
		} else {
			console.log(1);
			const result = await this.productVariantRepository.findFilteredVariantIds(collectionId, categoryIdArray, params.filters, params.search);

			if ( result.length === 0 )
				return emptyRes;

			for ( const resultElement of result ) {
				let underMax = true, overMin = true;
				if ( params.maxPrice ) underMax = resultElement.price <= params.maxPrice;
				if ( params.minPrice ) overMin = resultElement.price >= params.minPrice;
				if ( underMax && overMin ) ids.push(resultElement.id);
				if ( resultElement.price < minPrice ) minPrice = resultElement.price;
				if ( resultElement.price > maxPrice ) maxPrice = resultElement.price;
			}
			ids = result.map(res => res.id);
			console.log(2);
			products = await this.productVariantRepository.findByIdsWithSorting(ids, skip, take, params.sorting, params.language);
			console.log(3);
			const rawDrillDown = await this.productVariantRepository.attributeDrillDown(ids);
			attributeDrillDown = this.attributeFilterRawArrayToDrillDownArray(rawDrillDown);
		}

		return {
			items: products.map(p => params.variants ? ProductDto.prepare(p.product) : ProductDto.prepare(p)),
			totalCount: ids.length,
			pageSize: params.itemsPerPage,
			pageNumber: params.page,
			attributeDrillDown: attributeDrillDown,
			minPrice,
			maxPrice,
			selectedMinPrice: params.minPrice || 0,
			selectedMaxPrice: params.maxPrice || 0,
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
}

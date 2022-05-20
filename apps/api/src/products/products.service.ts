import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginatedRequest, getSlug, PaginatedResults } from '@nima-cms/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AttributeValuesService } from '../attributes/attribute-values.service';
import { CategoriesService } from '../categories/categories.service';
import { ProductTypeAttributesService } from '../product-types/product-type-attributes.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { CreateAssignedProductAttributeDto } from './dto/product-attribute-assignment.dto';
import { CreateAssignedProductAttributeValueDto } from './dto/product-attribute-value-assignment.dto';
import { ProductQueryFilterDto } from './dto/product-filtering.dto';
import { CreateProductDto } from './dto/product.dto';
import { AssignedProductAttributeEntity } from './entities/product-attribute-assignment.entity';
import { AssignedProductAttributeRepository } from './entities/product-attribute-assignment.repository';
import { AssignedProductAttributeValueEntity } from './entities/product-attribute-value-assignment.entity';
import { AssignedProductAttributeValueRepository } from './entities/product-attribute-value-assignment.repository';
import { ProductMediaRepository } from './entities/product-media.repository';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';

@Injectable()
export class ProductsService {
	constructor(
		private productRepository: ProductRepository,
		private productTypesService: ProductTypesService,
		private categoryService: CategoriesService,
		private productTypeAttributesService: ProductTypeAttributesService,
		private assignedProductAttributeRepository: AssignedProductAttributeRepository,
		private assignedProductAttributeValueRepository: AssignedProductAttributeValueRepository,
		private productMediaRepository: ProductMediaRepository,
		private attributeValuesService: AttributeValuesService,
	) {
	}

	save(params: { dto: CreateProductDto }): Promise<ProductEntity>
	save(params: { dto: CreateProductDto, id: number }): Promise<ProductEntity>
	@Transactional()
	async save(params: { dto: CreateProductDto, id?: number }): Promise<ProductEntity> {
		const { dto, id } = params;
		let productId = undefined;
		let oldProduct: ProductEntity = undefined;
		if ( id ) {
			productId = Number(id);
			if ( isNaN(productId) ) throw new BadRequestException('PRODUCT_ID_IS_NaN');
			oldProduct = await this.getById({ id: productId });
		}
		const productType = await this.productTypesService.getById({ id: dto.productTypeId });
		if ( !productType ) throw new NotFoundException('PRODUCT_TYPE_NOT_FOUND');
		// const attributes = await this.constructAttributes(dto.attributes);
		if ( !dto.slug ) dto.slug = getSlug(dto.name.en || dto.name.el);
		const category = await this.categoryService.findOne({ id: dto.categoryId, depth: 0 });

		const product = await this.productRepository.save({
			...dto,
			id: productId,
			productType: productType,
			category,
			attributes: undefined,
			productMedia: undefined,
		});

		await this.syncProductMedia({
			product,
			oldProductMedia: oldProduct?.productMedia || [],
			productMedia: dto.productMedia,
		});
		await this.syncAttributes({ oldAttributes: oldProduct?.attributes || [], newAttributes: dto.attributes, product: product });

		return await this.getById({ id: product.id });
	}

	async findAll(): Promise<ProductEntity[]> {
		return await this.productRepository.find();
	}

	async findAllPaginated(params: BasePaginatedRequest): Promise<PaginatedResults<ProductEntity>> {
		const take = params.itemsPerPage;
		const skip = (params.page - 1) * take;
		const productsAndCounts = await this.productRepository.listProductsAndCounts(take, skip);
		return {
			items: productsAndCounts.items,
			pageNumber: params.page,
			pageSize: params.itemsPerPage,
			totalCount: productsAndCounts.count,
		};
	}

	async getById(params: { id: number }): Promise<ProductEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_ID');
		const product = await this.productRepository.findById(params.id);
		if ( !product ) throw new NotFoundException('PRODUCT_NOT_FOUND');
		return product;
	}

	async findByIds(params: { ids: number[] }): Promise<ProductEntity[]> {
		return await this.productRepository.findByIds(params.ids);
	}

	async getOfCategory(params: { categoryId: number }): Promise<ProductEntity[]> {
		const { categoryId } = params;
		const categoryChildren = await this.categoryService.listIdsOfChildren({ id: categoryId });
		return this.productRepository.findByCategoryIds([categoryId, ...categoryChildren]);
	}

	async remove(params: { id: number }): Promise<ProductEntity> {
		const { id } = params;
		const product = await this.getById({ id: id });
		await this.productRepository.deleteById(id);
		return product;
	}

	async findFilteredProductIds(collectionId?: number, categoryIds?: number[], filters?: ProductQueryFilterDto[], search?: string): Promise<{ id: number, price: number }[]> {
		return await this.productRepository.findFilteredProductIds(collectionId, categoryIds, filters, search);
	}

	async setDefaultVariant(params: { productId: number, variantId: number }) {
		await this.productRepository.update(params.productId, {
			defaultVariant: { id: params.variantId },
		});
	}

	async setMinPrice(params: { productId: number, minPrice: number }) {
		await this.productRepository.update(params.productId, { minPrice: params.minPrice });
	}

	private async syncProductMedia(params: { productMedia: CreateProductDto['productMedia'], oldProductMedia: ProductEntity['productMedia'], product: ProductEntity }) {
		const { productMedia, oldProductMedia, product } = params;
		const oldIds = oldProductMedia.map(pm => pm.media.id);
		const newIds = productMedia.map(pm => pm.mediaId);

		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = productMedia.filter(pm => !oldIds.includes(pm.mediaId));

		const existing = oldProductMedia.filter(pt => newIds.includes(pt.media.id));
		const toUpdate = existing.filter(pm => pm.sortOrder !== productMedia.find(m => m.mediaId === pm.media.id)?.sortOrder);

		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.productMediaRepository.delete({
				media: {
					id: toDeleteElement,
				},
				product: {
					id: product.id,
				},
			}));
		}
		for ( const toAddElement of toAdd ) {
			promises.push(this.productMediaRepository.insert({
				media: {
					id: toAddElement.mediaId,
				},
				product: {
					id: product.id,
				},
				sortOrder: toAddElement.sortOrder,

			}));
		}

		for ( const toUpdateElement of toUpdate ) {
			const newValue = productMedia.find(pm => pm.mediaId === toUpdateElement.media.id);
			if ( !newValue ) continue;
			promises.push(this.productMediaRepository.update({
					media: {
						id: toUpdateElement.media.id,
					},
					product: {
						id: product.id,
					},
				},
				{
					sortOrder: newValue.sortOrder,
				},
			));
		}

		await Promise.all(promises);


	}

	private async syncAttributes(params: { oldAttributes: AssignedProductAttributeEntity[], newAttributes: CreateAssignedProductAttributeDto[], product: ProductEntity }) {
		const { oldAttributes, newAttributes, product } = params;
		const oldIds = oldAttributes.map(value => value.productTypeAttribute.id);
		const newIds = newAttributes.map(value => value.productTypeAttributeId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newAttributes.filter(att => !oldIds.includes(att.productTypeAttributeId));
		const existing = oldAttributes.filter(att => newIds.includes(att.productTypeAttribute.id));
		const toUpdate = existing.filter(att => att.values.map(v => v.id) !== newAttributes.find(nAtt => nAtt.productTypeAttributeId === att.productTypeAttribute.id).values.map(v => v.valueId));
		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.assignedProductAttributeRepository.deleteProductAttribute(product.id, toDeleteElement));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.createAttributeAssignment(createProductTypeAttributeDto, product));
		}
		for ( const assignedProductAttributeEntity of toUpdate ) {
			const nAtt = newAttributes.find(nAtt => nAtt.productTypeAttributeId === assignedProductAttributeEntity.productTypeAttribute.id);
			promises.push(this.syncValues({ oldValues: assignedProductAttributeEntity.values, newValues: nAtt.values, assignment: assignedProductAttributeEntity }));
		}

		await Promise.all(promises);
	}

	private async createAttributeAssignment(dto: CreateAssignedProductAttributeDto, product: ProductEntity) {
		const productTypeAttribute = await this.productTypeAttributesService.getById({ productTypeAttributeId: dto.productTypeAttributeId });
		const assignment = await this.assignedProductAttributeRepository.save({ product: product, productTypeAttribute });
		await this.syncValues({ oldValues: [], newValues: dto.values, assignment: assignment });
	}

	private async syncValues(params: { oldValues: AssignedProductAttributeValueEntity[], newValues: CreateAssignedProductAttributeValueDto[], assignment: AssignedProductAttributeEntity }) {
		const { oldValues, newValues, assignment } = params;
		const oldIds = oldValues.map(value => value.value.id);
		const newIds = newValues.map(value => value.valueId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newValues.filter(att => !oldIds.includes(att.valueId));
		const existing = oldValues.filter(att => newIds.includes(att.value.id));
		const toUpdate = existing.filter(att => {
			const nv = newValues.find(nAtt => nAtt.valueId === att.value.id);
			return att.sortOrder !== nv.sortOrder;
		});
		const promises: Promise<any>[] = [];

		for ( const toDeleteElement of toDelete ) {
			promises.push(this.assignedProductAttributeValueRepository.deleteProductAttributeValue(assignment.id, toDeleteElement));
		}
		for ( const createAssignedProductAttributeValueDto of toAdd ) {
			promises.push(this.createValue(createAssignedProductAttributeValueDto, assignment));
		}
		for ( const assignedProductAttributeValueEntity of toUpdate ) {
			const newAttr = newValues.find(attr => attr.valueId = assignedProductAttributeValueEntity.value.id);
			promises.push(this.assignedProductAttributeValueRepository.update({ id: assignedProductAttributeValueEntity.id }, { sortOrder: newAttr.sortOrder }));
		}
		await Promise.all(promises);
	}

	private async createValue(dto: CreateAssignedProductAttributeValueDto, assignment: AssignedProductAttributeEntity) {
		const value = await this.attributeValuesService.getById({ id: dto.valueId });
		await this.assignedProductAttributeValueRepository.save({ value: value, assignedProductAttribute: assignment, sortOrder: dto.sortOrder });
	}


}

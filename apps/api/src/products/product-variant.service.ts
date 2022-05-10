import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginatedRequest, PaginatedResults } from '@nima/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AttributeValuesService } from '../attributes/attribute-values.service';
import { ProductTypeVariantAttributesService } from '../product-types/product-type-variant-attributes.service';
import { CreateAssignedProductVariantAttributeDto } from './dto/product-attribute-assignment.dto';
import { CreateAssignedProductVariantAttributeValueDto } from './dto/product-attribute-value-assignment.dto';
import { CreateProductVariantDto } from './dto/product-variant.dto';
import { AssignedProductVariantAttributeEntity } from './entities/product-attribute-assignment.entity';
import { AssignedProductVariantAttributeRepository } from './entities/product-attribute-assignment.repository';
import { AssignedProductVariantAttributeValueEntity } from './entities/product-attribute-value-assignment.entity';
import { AssignedProductVariantAttributeValueRepository } from './entities/product-attribute-value-assignment.repository';
import { ProductVariantMediaRepository } from './entities/product-variant-media.repository';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductVariantRepository } from './entities/product-variant.repository';
import { ProductsService } from './products.service';

@Injectable()
export class ProductVariantService {
	constructor(
		private productsService: ProductsService,
		private productVariantRepository: ProductVariantRepository,
		private productTypeVariantAttributesService: ProductTypeVariantAttributesService,
		private assignedProductVariantAttributeRepository: AssignedProductVariantAttributeRepository,
		private assignedProductVariantAttributeValueRepository: AssignedProductVariantAttributeValueRepository,
		private productVariantMediaRepository: ProductVariantMediaRepository,
		private attributeValuesService: AttributeValuesService,
	) {
	}

	save(params: { productId: number, dto: CreateProductVariantDto }): Promise<ProductVariantEntity>
	save(params: { productId: number, dto: CreateProductVariantDto, id: number }): Promise<ProductVariantEntity>
	@Transactional()
	async save(params: { productId: number, dto: CreateProductVariantDto, id?: number }): Promise<ProductVariantEntity> {
		const { dto, id, productId } = params;
		let variantId = undefined;
		let oldVariant: ProductVariantEntity = undefined;
		if ( id ) {
			variantId = Number(id);
			if ( isNaN(variantId) ) throw new BadRequestException('PRODUCT_ID_IS_NaN');
			oldVariant = await this.getById({ id: variantId });
		}
		const product = await this.productsService.getById({ id: productId });
		if ( !product ) throw new NotFoundException('PRODUCT_TYPE_NOT_FOUND');
		// const attributes = await this.constructAttributes(dto.attributes);
		const variant = await this.productVariantRepository.save({ ...dto, id: variantId, product: product, attributes: undefined, productMedia: undefined });

		await this.syncAttributes({ oldAttributes: oldVariant?.attributes || [], newAttributes: dto.attributes, variant: variant });

		await this.syncProductMedia({
			variant,
			oldProductMedia: oldVariant?.productMedia || [],
			productMedia: dto.productMedia,
		});

		const allVariants = await this.findOfProduct({ productId });
		if ( allVariants.length === 1 ) {
			await this.productsService.setDefaultVariant({
				productId,
				variantId: variant.id,
			});
		}

		return await this.getById({ id: variant.id });
	}

	async findOfProduct(params: { productId: number }): Promise<ProductVariantEntity[]> {
		return await this.productVariantRepository.findByProductId(params.productId);
	}

	async findAll(): Promise<ProductVariantEntity[]> {
		return await this.productVariantRepository.find();
	}

	async findAllPaginated(params: BasePaginatedRequest & { productId: number }): Promise<PaginatedResults<ProductVariantEntity>> {
		const take = params.itemsPerPage;
		const skip = (params.page - 1) * take;
		const productsAndCounts = await this.productVariantRepository.listProductsAndCounts(params.productId, take, skip);
		return {
			items: productsAndCounts.items,
			pageNumber: params.page,
			pageSize: params.itemsPerPage,
			totalCount: productsAndCounts.count,
		};
	}

	async getById(params: { id: number }): Promise<ProductVariantEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_ID');
		const variant = await this.productVariantRepository.findById(params.id);
		if ( !variant ) throw new NotFoundException('PRODUCT_NOT_FOUND');
		return variant;
	}

	async findByIds(params: { ids: number[] }): Promise<ProductVariantEntity[]> {
		return await this.productVariantRepository.findByIds(params.ids);
	}

	async remove(params: { id: number }): Promise<ProductVariantEntity> {
		const { id } = params;
		const product = await this.getById({ id: id });
		await this.productVariantRepository.deleteById(id);
		return product;
	}

	private async syncProductMedia(params: { productMedia: CreateProductVariantDto['productMedia'], oldProductMedia: ProductVariantEntity['productMedia'], variant: ProductVariantEntity }) {
		const { productMedia, oldProductMedia, variant } = params;
		console.log('variant.id', variant.id);
		const oldIds = oldProductMedia.map(pm => pm.media.id);
		const newIds = productMedia.map(pm => pm.mediaId);

		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = productMedia.filter(pm => !oldIds.includes(pm.mediaId));

		const existing = oldProductMedia.filter(pt => newIds.includes(pt.media.id));
		const toUpdate = existing.filter(pm => pm.sortOrder !== productMedia.find(m => m.mediaId === pm.media.id)?.sortOrder);

		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.productVariantMediaRepository.delete({
				media: {
					id: toDeleteElement,
				},
				productVariant: {
					id: variant.id,
				},
			}));
		}
		for ( const toAddElement of toAdd ) {
			promises.push(this.productVariantMediaRepository.insert({
				media: {
					id: toAddElement.mediaId,
				},
				productVariant: {
					id: variant.id,
				},
				sortOrder: toAddElement.sortOrder,

			}));
		}

		for ( const toUpdateElement of toUpdate ) {
			const newValue = productMedia.find(pm => pm.mediaId === toUpdateElement.media.id);
			if ( !newValue ) continue;
			promises.push(this.productVariantMediaRepository.update({
					media: {
						id: toUpdateElement.media.id,
					},
					productVariant: {
						id: variant.id,
					},
				},
				{
					sortOrder: newValue.sortOrder,
				},
			));
		}

		await Promise.all(promises);
	}


	private async syncAttributes(params: { oldAttributes: AssignedProductVariantAttributeEntity[], newAttributes: CreateAssignedProductVariantAttributeDto[], variant: ProductVariantEntity }) {
		const { oldAttributes, newAttributes, variant } = params;
		const oldIds = oldAttributes.map(value => value.productTypeVariantAttribute.id);
		const newIds = newAttributes.map(value => value.productTypeVariantAttributeId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newAttributes.filter(att => !oldIds.includes(att.productTypeVariantAttributeId));
		const existing = oldAttributes.filter(att => newIds.includes(att.productTypeVariantAttribute.id));
		const toUpdate = existing.filter(att => att.values.map(v => v.id) !== newAttributes.find(nAtt => nAtt.productTypeVariantAttributeId === att.productTypeVariantAttribute.id).values.map(v => v.valueId));
		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.assignedProductVariantAttributeRepository.deleteProductVariantAttribute(variant.id, toDeleteElement));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.createAttributeAssignment(createProductTypeAttributeDto, variant));
		}
		for ( const assignedProductAttributeEntity of toUpdate ) {
			const nAtt = newAttributes.find(nAtt => nAtt.productTypeVariantAttributeId === assignedProductAttributeEntity.productTypeVariantAttribute.id);
			promises.push(this.syncValues({ oldValues: assignedProductAttributeEntity.values, newValues: nAtt.values, assignment: assignedProductAttributeEntity }));
		}

		await Promise.all(promises);
	}

	private async createAttributeAssignment(dto: CreateAssignedProductVariantAttributeDto, variant: ProductVariantEntity) {
		const productTypeVariantAttributeEntity = await this.productTypeVariantAttributesService.getById({ productTypeAttributeId: dto.productTypeVariantAttributeId });
		const assignment = await this.assignedProductVariantAttributeRepository.save({ variant: variant, productTypeVariantAttribute: productTypeVariantAttributeEntity });
		await this.syncValues({ oldValues: [], newValues: dto.values, assignment: assignment });
	}

	private async syncValues(params: { oldValues: AssignedProductVariantAttributeValueEntity[], newValues: CreateAssignedProductVariantAttributeValueDto[], assignment: AssignedProductVariantAttributeEntity }) {
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
			promises.push(this.assignedProductVariantAttributeValueRepository.deleteProductAttributeValue(assignment.id, toDeleteElement));
		}
		for ( const createAssignedProductAttributeValueDto of toAdd ) {
			promises.push(this.createValue(createAssignedProductAttributeValueDto, assignment));
		}
		for ( const assignedProductAttributeValueEntity of toUpdate ) {
			const newAttr = newValues.find(attr => attr.valueId = assignedProductAttributeValueEntity.value.id);
			promises.push(this.assignedProductVariantAttributeValueRepository.update({ id: assignedProductAttributeValueEntity.id }, { sortOrder: newAttr.sortOrder }));
		}
		await Promise.all(promises);
	}

	private async createValue(dto: CreateAssignedProductVariantAttributeValueDto, assignment: AssignedProductVariantAttributeEntity) {
		const value = await this.attributeValuesService.getById({ id: dto.valueId });
		await this.assignedProductVariantAttributeValueRepository.save({ value: value, assignedProductVariantAttribute: assignment, sortOrder: dto.sortOrder });
	}
}

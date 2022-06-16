import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginatedRequest, PaginatedResults, roundToDigit } from '@nima-cms/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AttributeValuesService } from '../attributes/attribute-values.service';
import { SortableMediaDto } from '../core/dto/media.dto';
import { DiscountSalesService } from '../discounts/discount-sales.service';
import { DiscountType } from '../discounts/dto/discount.enum';
import { DiscountSaleEntity } from '../discounts/entities/discount-sale.entity';
import { ProductTypeVariantAttributesService } from '../product-types/product-type-variant-attributes.service';
import { CreateAssignedProductVariantAttributeDto, ProductAttributeDto } from './dto/product-attribute-assignment.dto';
import { CreateAssignedProductVariantAttributeValueDto } from './dto/product-attribute-value-assignment.dto';
import { CreateProductVariantDto, ProductVariantDto } from './dto/product-variant.dto';
import { AssignedProductVariantAttributeEntity } from './entities/product-attribute-assignment.entity';
import { AssignedProductVariantAttributeValueEntity } from './entities/product-attribute-value-assignment.entity';
import { ProductVariantEntity } from './entities/product-variant.entity';
import { ProductsService } from './products.service';
import { AssignedProductVariantAttributeRepository } from './repositories/product-attribute-assignment.repository';
import { AssignedProductVariantAttributeValueRepository } from './repositories/product-attribute-value-assignment.repository';
import { ProductVariantMediaRepository } from './repositories/product-variant-media.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';

@Injectable()
export class ProductVariantService {
	constructor(
		@Inject(forwardRef(() => ProductsService))
		private productsService: ProductsService,
		private productVariantRepository: ProductVariantRepository,
		private productTypeVariantAttributesService: ProductTypeVariantAttributesService,
		private assignedProductVariantAttributeRepository: AssignedProductVariantAttributeRepository,
		private assignedProductVariantAttributeValueRepository: AssignedProductVariantAttributeValueRepository,
		private productVariantMediaRepository: ProductVariantMediaRepository,
		private attributeValuesService: AttributeValuesService,
		@Inject(forwardRef(() => DiscountSalesService))
		private salesService: DiscountSalesService,
	) {
	}

	save(params: { productId: number, dto: CreateProductVariantDto }): Promise<number>
	save(params: { productId: number, dto: CreateProductVariantDto, id: number }): Promise<number>
	@Transactional()
	async save(params: { productId: number, dto: CreateProductVariantDto, id?: number }): Promise<number> {
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
		const minPrice = Math.min(...allVariants.map(v => v.priceAmount || 0));
		await this.productsService.setMinPrice({ productId, minPrice });
		if ( allVariants.length === 1 ) {
			await this.productsService.setDefaultVariant({
				productId,
				variantId: variant.id,
			});
		}

		await this.syncVariantDiscountValue({ variantId: variant.id });

		return variant.id;
	}

	async findOfProduct(params: { productId: number }): Promise<ProductVariantEntity[]> {
		return await this.productVariantRepository.findByProductId(params.productId);
	}

	async findIdsOfProduct(params: { productId: number }): Promise<number[]> {
		return await this.productVariantRepository.findIdsByProductId(params.productId);
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
		if ( !variant ) throw new NotFoundException('PRODUCT_VARIANT_NOT_FOUND');
		return variant;
	}

	async getByIdWithoutEager(params: { id: number }): Promise<ProductVariantEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_ID');
		const variant = await this.productVariantRepository.findOne({
			where: {
				id: params.id,
			},
			loadEagerRelations: false,
		});
		if ( !variant ) throw new NotFoundException('PRODUCT_VARIANT_NOT_FOUND');
		return variant;
	}

	async findByIds(params: { ids: number[] }): Promise<ProductVariantEntity[]> {
		return await this.productVariantRepository.findByIds(params.ids);
	}

	async remove(params: { id: number }): Promise<void> {
		const { id } = params;
		await this.productVariantRepository.deleteById(id);
	}

	async syncVariantDiscountValue(params: { variantId: number }): Promise<void> {
		const variant = await this.productVariantRepository.getFullObject(params.variantId);
		const discountPrice = await this.calculateDiscountedPrice(variant);
		await this.productVariantRepository.update(params.variantId, {
			discountedPrice: discountPrice ? discountPrice : null,
		});
	}

	async getLowestPrices(ids?: number[]): Promise<{ id: number, basePrice: number, lowestPrice: number, sale?: DiscountSaleEntity }[]> {
		let entities: ProductVariantEntity[];
		if ( ids ) {
			entities = await this.productVariantRepository.findByIds(ids);
		} else {
			entities = await this.productVariantRepository.find();
		}
		const res: { id: number, basePrice: number, lowestPrice: number, sale: DiscountSaleEntity }[] = [];
		const discountMap = await this.salesService.getVariantDiscountMap();
		for ( const entity of entities ) {
			const discounts = discountMap[entity.id];
			const basePrice = entity.priceAmount || 0;
			let sale = undefined;
			let lowestPrice = basePrice;
			if ( discounts && discounts.length > 0 ) {
				for ( const discount of discounts ) {
					let temp = Number.MAX_SAFE_INTEGER;
					if ( discount.discountType === DiscountType.PERCENTAGE ) {
						temp = basePrice - (discount.discountValue * basePrice / 100);
					} else if ( discount.discountType === DiscountType.FLAT ) {
						temp = Math.max(basePrice - discount.discountValue, 0);
					}
					if ( temp < lowestPrice ) {
						lowestPrice = temp;
						sale = discount;
					}
				}
			}
			res.push({ id: entity.id, lowestPrice: lowestPrice, sale: sale, basePrice: basePrice });
		}
		return res;
	}

	async getDto(id: number, options?: { isAdmin?: boolean }): Promise<ProductVariantDto> {
		const entity = await this.productVariantRepository.getFullObject(id);
		return {
			id: entity.id,
			name: entity.name,
			created: entity.created,
			currency: entity.currency,
			weight: entity.weight,
			metadata: entity.metadata,
			privateMetadata: options?.isAdmin ? entity.privateMetadata : {},
			updatedAt: entity.updatedAt,
			attributes: entity.attributes.map(attr => ProductAttributeDto.prepareVariant(attr)),
			sortOrder: entity.sortOrder,
			productId: entity.productId,
			sku: entity.sku,
			stock: entity.stock,
			trackInventory: entity.trackInventory,
			productMedia: entity.productMedia.map(pm => SortableMediaDto.prepare(pm)),
			priceAmount: entity.priceAmount,
			discountedPrice: entity.discountedPrice,
		};
	}

	private async syncProductMedia(params: { productMedia: CreateProductVariantDto['productMedia'], oldProductMedia: ProductVariantEntity['productMedia'], variant: ProductVariantEntity }) {
		const { productMedia, oldProductMedia, variant } = params;
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
			const newAttr = newValues.find(attr => attr.valueId === assignedProductAttributeValueEntity.value.id);
			promises.push(this.assignedProductVariantAttributeValueRepository.update({ id: assignedProductAttributeValueEntity.id }, { sortOrder: newAttr.sortOrder }));
		}
		await Promise.all(promises);
	}

	private async createValue(dto: CreateAssignedProductVariantAttributeValueDto, assignment: AssignedProductVariantAttributeEntity) {
		const value = await this.attributeValuesService.getById({ id: dto.valueId });
		await this.assignedProductVariantAttributeValueRepository.save({ value: value, assignedProductVariantAttribute: assignment, sortOrder: dto.sortOrder });
	}

	private async calculateDiscountedPrice(entity: ProductVariantEntity): Promise<undefined | number> {
		const variantId = entity.id;
		const productId = entity.productId;
		const categoryId = entity.product.category.id;
		const collectionIds = entity.product.collections.map(c => c.collection.id);
		const basePrice = entity.priceAmount;
		if ( !basePrice ) return undefined;
		const discounts = await this.salesService.findDiscountsOfVariant({ variantId: variantId, productId: productId, categoryId: categoryId, collectionIds: collectionIds });
		if ( !discounts || discounts.length === 0 ) return undefined;
		let lowestPrice = basePrice;
		for ( const discount of discounts ) {
			let temp = Number.MAX_SAFE_INTEGER;
			if ( discount.discountType === DiscountType.PERCENTAGE ) {
				temp = basePrice - (discount.discountValue * basePrice / 100);
			} else if ( discount.discountType === DiscountType.FLAT ) {
				temp = Math.max(basePrice - discount.discountValue, 0);
			}
			if ( temp < lowestPrice ) lowestPrice = temp;
		}
		return roundToDigit(lowestPrice);
	}
}

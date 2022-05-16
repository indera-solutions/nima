import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima-cms/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {
	CreateProductTypeAttributeDto,
	CreateProductTypeVariantAttributeDto,
} from '../dto/product-type-attribute.dto';
import { CreateProductTypeDto, ProductTypeDto } from '../dto/product-type.dto';
import { ProductTypeAttributeEntity, ProductTypeEntity, ProductTypeVariantAttributeEntity } from '../entities';
import { ProductTypeRepository } from '../repositories';
import { ProductTypeAttributesService } from './product-type-attributes.service';
import { ProductTypeVariantAttributesService } from './product-type-variant-attributes.service';

@Injectable()
export class ProductTypesService {
	constructor(
		private productTypeRepository: ProductTypeRepository,
		@Inject(forwardRef(() => ProductTypeAttributesService))
		private readonly simpleAttributeService: ProductTypeAttributesService,
		@Inject(forwardRef(() => ProductTypeVariantAttributesService))
		private readonly variantAttributeService: ProductTypeVariantAttributesService,
	) {
	}


	@Transactional()
	async create(params: { dto: CreateProductTypeDto }): Promise<ProductTypeEntity> {
		const { dto } = params;
		if ( !dto.slug ) {
			dto.slug = getSlug(dto.name);
		}

		const pta = dto.attributes.map(pta => pta.attributeId);
		const ptva = dto.variantAttributes.map(pta => pta.attributeId);
		const erroneousAttributeId = pta.find(a => ptva.includes(a)) || ptva.find(a => pta.includes(a));
		if ( erroneousAttributeId ) {
			throw new BadRequestException('NOT_EXCLUSIVE_ATTRIBUTES', `Attributes and Variant Attributes cannot contain the same Attribute ID. ID ${ erroneousAttributeId } appears twice`);
		}
		const pt = await this.productTypeRepository.save({
			...dto,
			hasVariants: ptva.length > 0,
			attributes: undefined,
			variantAttributes: undefined,
		});

		await Promise.all([
			this.syncAttributes({ newAttributes: dto.attributes, oldAttributes: [], ptId: pt.id }),
			this.syncVariantAttributes({ newAttributes: dto.variantAttributes, oldAttributes: [], ptId: pt.id }),
		]);


		return await this.getById({ id: pt.id });
	}

	async list(params?: EmptyObject): Promise<ProductTypeEntity[]> {
		return await this.productTypeRepository.find();
	}

	async getById(params: { id: number, isAdmin?: boolean }): Promise<ProductTypeEntity> {
		const { id, isAdmin } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		return await this.productTypeRepository.getById(id);
	}

	@Transactional()
	async update(params: { dto: CreateProductTypeDto, id: number }): Promise<ProductTypeEntity> {
		const { dto, id } = params;
		let productTypeId = undefined;
		let oldPt: ProductTypeEntity = undefined;
		productTypeId = Number(id);
		if ( isNaN(productTypeId) ) throw new BadRequestException('PRODUCT_TYPE_ID_IS_NaN');
		oldPt = await this.getById({ id, isAdmin: true });


		const pta = dto.attributes.map(pta => pta.attributeId);
		const ptva = dto.variantAttributes.map(pta => pta.attributeId);
		const erroneousAttributeId = pta.find(a => ptva.includes(a)) || ptva.find(a => pta.includes(a));
		if ( erroneousAttributeId ) {
			throw new BadRequestException('NOT_EXCLUSIVE_ATTRIBUTES', `Attributes and Variant Attributes cannot contain the same Attribute ID. ID ${ erroneousAttributeId } appears twice`);
		}
		const pt = await this.productTypeRepository.save({
			...dto,
			id: productTypeId,
			hasVariants: ptva.length > 0,
			attributes: undefined,
			variantAttributes: undefined,
		});

		await Promise.all([
			this.syncAttributes({ newAttributes: dto.attributes, oldAttributes: oldPt.attributes, ptId: pt.id }),
			this.syncVariantAttributes({ newAttributes: dto.variantAttributes, oldAttributes: oldPt.variantAttributes, ptId: pt.id }),
		]);


		return await this.getById({ id: pt.id });
	}

	async deleteById(params: { id: number }): Promise<ProductTypeEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		const pt = await this.getById({ id });
		await this.productTypeRepository.deleteById(id);
		return pt;
	}

	async getDtos(ids?: number[]): Promise<ProductTypeDto[]> {
		const relations = ['attributes', 'attributes.attribute', 'variantAttributes', 'variantAttributes.attribute'];
		const productTypeEntities = ids ? await this.productTypeRepository.findByIds(ids, { relations }) :
			await this.productTypeRepository.find({ relations });
		return productTypeEntities.map(productType => this.parseDto(productType));
	}

	async getDto(id: number): Promise<ProductTypeDto> {
		const dtos = await this.getDtos([id]);
		if ( !dtos[0] ) throw new NotFoundException('PRODUCT_TYPE_NOT_FOUND');
		return dtos[0];
	}

	parseDto(entity: ProductTypeEntity): ProductTypeDto {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			hasVariants: entity.hasVariants,
			isDigital: entity.isDigital,
			isShippingRequired: entity.isShippingRequired,
			metadata: entity.metadata,
			privateMetadata: entity.privateMetadata,
			weight: entity.weight,
			attributes: entity.attributes.map(pta => ({
				id: pta.id,
				attributeId: pta.attribute.id,
				sortOrder: pta.sortOrder,
			})),
			variantAttributes: entity.variantAttributes.map(ptva => ({
				id: ptva.id,
				attributeId: ptva.attribute.id,
				sortOrder: ptva.sortOrder,
				variantSelection: ptva.variantSelection,
			})),
		};
	}

	private async syncAttributes(params: { oldAttributes: ProductTypeAttributeEntity[], newAttributes: CreateProductTypeAttributeDto[], ptId: number }) {
		const { oldAttributes, newAttributes, ptId } = params;
		const oldIds = oldAttributes.map(value => value.attribute.id);
		const newIds = newAttributes.map(value => value.attributeId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newAttributes.filter(att => !oldIds.includes(att.attributeId));
		const existing = oldAttributes.filter(att => newIds.includes(att.attribute.id));
		const toUpdate = existing.filter(att => att.sortOrder !== newAttributes.find(nAtt => nAtt.attributeId === att.attribute.id).sortOrder);
		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.simpleAttributeService.deleteProductTypeAttribute({ productTypeId: ptId, attributeId: toDeleteElement }));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.simpleAttributeService.save({ productTypeId: ptId, dto: createProductTypeAttributeDto }));
		}
		for ( const productTypeAttributeEntity of toUpdate ) {
			const newAttr = newAttributes.find(attr => attr.attributeId = productTypeAttributeEntity.attribute.id);
			promises.push(this.simpleAttributeService.patch({ productTypeId: ptId, dto: { sortOrder: newAttr.sortOrder }, productTypeAttributeId: productTypeAttributeEntity.id }));
		}
		await Promise.all(promises);
	}

	private async syncVariantAttributes(params: { oldAttributes: ProductTypeVariantAttributeEntity[], newAttributes: CreateProductTypeVariantAttributeDto[], ptId: number }) {
		const { oldAttributes, newAttributes, ptId } = params;
		const oldIds = oldAttributes.map(value => value.attribute.id);
		const newIds = newAttributes.map(value => value.attributeId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newAttributes.filter(att => !oldIds.includes(att.attributeId));
		const existing = oldAttributes.filter(att => newIds.includes(att.attribute.id));
		const toUpdate = existing.filter(att => {
			const nAtt = newAttributes.find(nAtt => nAtt.attributeId === att.attribute.id);
			return att.sortOrder !== nAtt.sortOrder || att.variantSelection !== nAtt.variantSelection;
		});
		const promises: Promise<any>[] = [];

		for ( const toDeleteElement of toDelete ) {
			promises.push(this.variantAttributeService.deleteProductTypeAttribute({ productTypeId: ptId, attributeId: toDeleteElement }));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.variantAttributeService.save({ productTypeId: ptId, dto: createProductTypeAttributeDto }));
		}
		for ( const productTypeAttributeEntity of toUpdate ) {
			const newAttr = newAttributes.find(attr => attr.attributeId = productTypeAttributeEntity.attribute.id);
			promises.push(this.variantAttributeService.patch({ productTypeId: ptId, dto: { sortOrder: newAttr.sortOrder, variantSelection: newAttr.variantSelection }, productTypeAttributeId: productTypeAttributeEntity.id }));
		}
		await Promise.all(promises);
	}
}

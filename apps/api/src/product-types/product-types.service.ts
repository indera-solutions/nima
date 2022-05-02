import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateProductTypeDto, ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeEntity } from './entities';
import { ProductTypeAttributesService } from './product-type-attributes.service';
import { ProductTypeVariantAttributesService } from './product-type-variant-attributes.service';
import { ProductTypeRepository } from './repositories';

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

	private static prepareProductType(pt: ProductTypeEntity, isAdmin?: boolean): ProductTypeDto {
		return {
			id: pt.id,
			name: pt.name,
			slug: pt.slug,
			hasVariants: pt.hasVariants,
			isDigital: pt.isDigital,
			isShippingRequired: pt.isShippingRequired,
			metadata: pt.metadata,
			privateMetadata: isAdmin ? pt.privateMetadata : {},
			weight: pt.weight,
			attributes: pt.attributes.map(pta => ProductTypeAttributesService.prepareProductTypeAttribute(pta)),
			variantAttributes: pt.variantAttributes.map(ptva => ProductTypeVariantAttributesService.prepareProductTypeVariantAttribute(ptva)),
		};
	}

	save(params: { dto: CreateProductTypeDto }): Promise<ProductTypeEntity>
	save(params: { dto: CreateProductTypeDto, id: number }): Promise<ProductTypeEntity>
	@Transactional()
	async save(params: { dto: CreateProductTypeDto, id?: number }): Promise<ProductTypeEntity> {
		const { dto, id } = params;
		let productTypeId = undefined;
		let oldPt: ProductTypeEntity = undefined;
		if ( id ) {
			productTypeId = Number(id);
			if ( isNaN(productTypeId) ) throw new BadRequestException('PRODUCT_TYPE_ID_IS_NaN');
			oldPt = await this.getById({ id, isAdmin: true });
		}
		if ( !dto.slug ) {
			dto.slug = getSlug(dto.name);
		}

		const pta = dto.attributes.map(pta => pta.attributeId);
		const ptva = dto.variantAttributes.map(pta => pta.attributeId);
		//TODO: Error should contain erroneous attributeId
		if ( pta.some(a => ptva.includes(a)) || ptva.some(a => pta.includes(a)) ) {
			throw new BadRequestException('NOT_EXCLUSIVE_ATTRIBUTES', 'Attributes and Variant Attributes cannot contain the same Attribute Id');
		}

		const pt = await this.productTypeRepository.save({ ...dto, id: productTypeId });

		pt.attributes = [];
		const oldPtAttr = oldPt?.attributes.map(attr => attr.attribute.id) || [];
		for ( const attribute of dto.attributes ) {
			if ( !oldPtAttr.includes(attribute.attributeId) ) {
				const res = await this.simpleAttributeService.save({ productTypeId: pt.id, dto: attribute });
				pt.attributes.push(res);
			} else {
				pt.attributes.push(oldPt?.attributes.find(att => att.attribute.id === attribute.attributeId));
			}
		}
		for ( const attrId of oldPtAttr ) {
			if ( !dto.attributes.map(attr => attr.attributeId).includes(attrId) ) {
				await this.simpleAttributeService.deleteProductTypeAttribute({ productTypeId: pt.id, attributeId: attrId });
			}
		}

		const oldPtVAttr = oldPt?.variantAttributes.map(attr => attr.attribute.id) || [];
		pt.variantAttributes = [];
		for ( const attribute of dto.variantAttributes ) {
			if ( !oldPtVAttr.includes(attribute.attributeId) ) {
				const res = await this.variantAttributeService.save({ productTypeId: pt.id, dto: attribute });
				pt.variantAttributes.push(res);
			} else {
				pt.variantAttributes.push(oldPt?.variantAttributes.find(att => att.attribute.id === attribute.attributeId));
			}
		}
		for ( const attrId of oldPtVAttr ) {
			if ( !dto.variantAttributes.map(attr => attr.attributeId).includes(attrId) ) {
				await this.variantAttributeService.deleteProductTypeAttribute({ productTypeId: pt.id, attributeId: attrId });
			}
		}
		return pt;
	}

	async list(params?: EmptyObject): Promise<ProductTypeEntity[]> {
		return await this.productTypeRepository.find();
	}

	async getById(params: { id: number, isAdmin?: boolean }): Promise<ProductTypeEntity> {
		const { id, isAdmin } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		return await this.productTypeRepository.getById(id);
	}

	async deleteById(params: { id: number }): Promise<ProductTypeEntity> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		const pt = await this.getById({ id });
		await this.productTypeRepository.deleteById(id);
		return pt;
	}
}

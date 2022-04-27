import { BadRequestException, Injectable } from '@nestjs/common';
import { AttributesService } from '../attributes/attributes.service';
import {
	CreateProductTypeVariantAttributeDto,
	ProductTypeVariantAttributeDto,
	UpdateProductTypeAttributeDto,
} from './dto/product-type-attribute.dto';
import { ProductTypeVariantAttributeEntity } from './entities';
import { ProductTypesService } from './product-types.service';
import { ProductTypeVariantAttributeRepository } from './repositories';

@Injectable()
export class ProductTypeVariantAttributesService {
	constructor(
		private productTypeVariantAttributeRepository: ProductTypeVariantAttributeRepository,
		private productTypesService: ProductTypesService,
		private attributesService: AttributesService,
	) {
	}

	private static prepareProductTypeVariantAttribute(pta: ProductTypeVariantAttributeEntity): ProductTypeVariantAttributeDto {
		return {
			attribute: pta.attribute,
			productType: pta.productType,
			id: pta.id,
			sortOrder: pta.sortOrder,
			variantSelection: pta.variantSelection,
		};
	}

	save(params: { productTypeId: number, dto: CreateProductTypeVariantAttributeDto }): Promise<ProductTypeVariantAttributeDto>
	save(params: { productTypeId: number, dto: CreateProductTypeVariantAttributeDto, productTypeAttributeId: number }): Promise<ProductTypeVariantAttributeDto>
	async save(params: { productTypeId: number, dto: CreateProductTypeVariantAttributeDto, productTypeAttributeId?: number }): Promise<ProductTypeVariantAttributeDto> {
		const { productTypeAttributeId, dto, productTypeId } = params;
		let _productTypeAttributeId = undefined;
		const attribute = await this.attributesService.getById({ id: dto.attributeId });
		const productType = await this.productTypesService.getById({ id: productTypeId });
		if ( productTypeAttributeId ) {
			_productTypeAttributeId = Number(productTypeAttributeId);
			if ( isNaN(_productTypeAttributeId) ) throw new BadRequestException('PRODUCT_TYPE_ID_IS_NaN');
		}
		const res = await this.productTypeVariantAttributeRepository.save({ ...dto, id: _productTypeAttributeId, attribute: attribute, productType: productType });
		return ProductTypeVariantAttributesService.prepareProductTypeVariantAttribute(res);
	}

	async listOfProductType(params: { productTypeId: number }): Promise<ProductTypeVariantAttributeDto[]> {
		const { productTypeId } = params;
		const res = await this.productTypeVariantAttributeRepository.listOfProductType(productTypeId);
		return res.map(pta => ProductTypeVariantAttributesService.prepareProductTypeVariantAttribute(pta));
	}

	async getById(params: { productTypeAttributeId: number }): Promise<ProductTypeVariantAttributeDto> {
		const { productTypeAttributeId } = params;
		const res = await this.productTypeVariantAttributeRepository.getById(productTypeAttributeId);
		return ProductTypeVariantAttributesService.prepareProductTypeVariantAttribute(res);
	}

	async patch(params: { productTypeId: number, productTypeAttributeId: number, dto: UpdateProductTypeAttributeDto }): Promise<ProductTypeVariantAttributeDto> {
		const { productTypeId, productTypeAttributeId, dto } = params;
		const pta = await this.getById({ productTypeAttributeId: productTypeAttributeId });
		const tempPta = new CreateProductTypeVariantAttributeDto();
		for ( const dtoKey in dto ) {
			tempPta[dtoKey] = dto[dtoKey] || pta[dtoKey];
		}
		tempPta.attributeId = dto.attributeId || pta.attribute.id;
		return this.save({ dto: tempPta, productTypeId: productTypeId, productTypeAttributeId: productTypeAttributeId });
	}

	async deleteById(params: { productTypeAttributeId: number }): Promise<ProductTypeVariantAttributeDto> {
		const { productTypeAttributeId } = params;
		const attr = await this.getById({ productTypeAttributeId });
		await this.productTypeVariantAttributeRepository.deleteById(productTypeAttributeId);
		return ProductTypeVariantAttributesService.prepareProductTypeVariantAttribute(attr);
	}
}

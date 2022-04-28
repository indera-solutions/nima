import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AttributesService } from '../attributes/attributes.service';
import {
	CreateProductTypeAttributeDto,
	ProductTypeAttributeDto,
	UpdateProductTypeAttributeDto,
} from './dto/product-type-attribute.dto';
import { ProductTypeAttributeEntity } from './entities';
import { ProductTypesService } from './product-types.service';
import { ProductTypeAttributeRepository } from './repositories';

@Injectable()
export class ProductTypeAttributesService {
	constructor(
		private productTypeAttributeRepository: ProductTypeAttributeRepository,
		@Inject(forwardRef(() => ProductTypesService))
		private productTypesService: ProductTypesService,
		private attributesService: AttributesService,
	) {
	}

	static prepareProductTypeAttribute(pta: ProductTypeAttributeEntity): ProductTypeAttributeDto {
		return {
			attributeId: pta.attribute.id,
			sortOrder: pta.sortOrder,
		};
	}

	save(params: { productTypeId: number, dto: CreateProductTypeAttributeDto }): Promise<ProductTypeAttributeDto>
	save(params: { productTypeId: number, dto: CreateProductTypeAttributeDto, productTypeAttributeId: number }): Promise<ProductTypeAttributeDto>
	@Transactional()
	async save(params: { productTypeId: number, dto: CreateProductTypeAttributeDto, productTypeAttributeId?: number }): Promise<ProductTypeAttributeDto> {
		const { productTypeAttributeId, dto, productTypeId } = params;
		let _productTypeAttributeId = undefined;
		const attribute = await this.attributesService.getById({ id: dto.attributeId });
		const productType = await this.productTypesService.getById({ id: productTypeId });
		if ( productTypeAttributeId ) {
			_productTypeAttributeId = Number(productTypeAttributeId);
			if ( isNaN(_productTypeAttributeId) ) throw new BadRequestException('PRODUCT_TYPE_ID_IS_NaN');
		}
		return await this.productTypeAttributeRepository.save({ ...dto, id: _productTypeAttributeId, attribute: attribute, productType: productType });
	}

	async listOfProductType(params: { productTypeId: number }): Promise<ProductTypeAttributeDto[]> {
		const { productTypeId } = params;
		const res = await this.productTypeAttributeRepository.listOfProductType(productTypeId);
		return res.map(pta => ProductTypeAttributesService.prepareProductTypeAttribute(pta));
	}

	async getById(params: { productTypeAttributeId: number }): Promise<ProductTypeAttributeDto> {
		const { productTypeAttributeId } = params;
		const res = await this.productTypeAttributeRepository.getById(productTypeAttributeId);
		return ProductTypeAttributesService.prepareProductTypeAttribute(res);
	}

	async patch(params: { productTypeId: number, productTypeAttributeId: number, dto: UpdateProductTypeAttributeDto }): Promise<ProductTypeAttributeDto> {
		// const { productTypeId, productTypeAttributeId, dto } = params;
		// const pta = await this.getById({ productTypeAttributeId: productTypeAttributeId });
		// const tempPta = new CreateProductTypeAttributeDto();
		// for ( const dtoKey in dto ) {
		// 	tempPta[dtoKey] = dto[dtoKey] || pta[dtoKey];
		// }
		// tempPta.attributeId = dto.attributeId || pta.attribute.id;
		// return this.save({ dto: tempPta, productTypeId: productTypeId, productTypeAttributeId:
		// productTypeAttributeId });
		throw new Error('');

	}

	async deleteById(params: { productTypeAttributeId: number }): Promise<ProductTypeAttributeDto> {
		const { productTypeAttributeId } = params;
		const attr = await this.getById({ productTypeAttributeId });
		await this.productTypeAttributeRepository.deleteById(productTypeAttributeId);
		return attr;
	}

	async deleteProductTypeAttribute(params: { productTypeId: number, attributeId: number }): Promise<ProductTypeAttributeEntity> {
		const { productTypeId, attributeId } = params;
		const attr = await this.productTypeAttributeRepository.getByAttributeAndProductTypeId(productTypeId, attributeId);
		await this.productTypeAttributeRepository.deleteByAttributeAndProductTypeId(productTypeId, attributeId);
		return attr;
	}
}

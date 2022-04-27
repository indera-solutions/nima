import { BadRequestException, Injectable } from '@nestjs/common';
import { EmptyObject, getSlug } from '@nima/utils';
import { CreateProductTypeDto, ProductTypeDto, UpdateProductTypeDto } from './dto/product-type.dto';
import { ProductTypeEntity } from './entities';
import { ProductTypeRepository } from './repositories';

@Injectable()
export class ProductTypesService {
	constructor(private productTypeRepository: ProductTypeRepository) {
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
		};
	}

	save(params: { dto: CreateProductTypeDto }): Promise<ProductTypeDto>
	save(params: { dto: CreateProductTypeDto, id: number }): Promise<ProductTypeDto>
	async save(params: { dto: CreateProductTypeDto, id?: number }): Promise<ProductTypeDto> {
		const { dto, id } = params;
		let productTypeId = undefined;
		if ( id ) {
			productTypeId = Number(id);
			if ( isNaN(productTypeId) ) throw new BadRequestException('PRODUCT_TYPE_ID_IS_NaN');
		}
		if ( !dto.slug ) {
			dto.slug = getSlug(dto.name);
		}
		const pt = await this.productTypeRepository.save({ ...dto, id: productTypeId });
		return ProductTypesService.prepareProductType(pt, true);
	}

	async list(params?: EmptyObject): Promise<ProductTypeDto[]> {
		const res = await this.productTypeRepository.find();
		return res.map(pt => ProductTypesService.prepareProductType(pt));
	}

	async getById(params: { id: number, isAdmin?: boolean }): Promise<ProductTypeDto> {
		const { id, isAdmin } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		const res = await this.productTypeRepository.getById(id);
		return ProductTypesService.prepareProductType(res, isAdmin);
	}

	async patchProductType(params: { dto: UpdateProductTypeDto, productTypeId: number }) {
		const { dto, productTypeId } = params;
		const pt = await this.getById({ id: productTypeId, isAdmin: true });
		for ( const dtoKey in dto ) {
			pt[dtoKey] = dto[dtoKey];
		}
		return this.save({ dto: pt, id: productTypeId });
	}

	async deleteById(params: { id: number }): Promise<ProductTypeDto> {
		const { id } = params;
		if ( !id ) throw new BadRequestException('INVALID_PRODUCT_TYPE_ID');
		const pt = await this.getById({ id });
		await this.productTypeRepository.deleteById(id);
		return ProductTypesService.prepareProductType(pt);
	}
}

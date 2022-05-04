import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginatedRequest, PaginatedResults } from '@nima/utils';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ProductTypesService } from '../product-types/product-types.service';
import { CreateAssignedProductAttributeDto } from './dto/product-attribute-assignment.dto';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { AssignedProductAttributeEntity } from './entities/product-attribute-assignment.entity';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from './entities/product.repository';

@Injectable()
export class ProductsService {
	constructor(
		private productRepository: ProductRepository,
		private productTypesService: ProductTypesService,
	) {
	}

	save(params: { dto: CreateProductDto }): Promise<ProductEntity>
	save(params: { dto: CreateProductDto, id: number }): Promise<ProductEntity>
	@Transactional()
	async save(params: { dto: CreateProductDto, id?: number }): Promise<ProductEntity> {
		const { dto, id } = params;
		let productId = undefined;
		if ( id ) {
			productId = Number(id);
			if ( isNaN(productId) ) throw new BadRequestException('PRODUCT_ID_IS_NaN');
		}
		const productType = await this.productTypesService.getById({ id: dto.productTypeId });
		if ( !productType ) throw new NotFoundException('PRODUCT_TYPE_NOT_FOUND');
		return await this.productRepository.save({ ...dto, id: productId, productType: productType });
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

	async findOne(params: { id: number }): Promise<ProductEntity> {
		return await this.productRepository.findById(params.id);
	}

	async findByIds(params: { ids: number[] }): Promise<ProductEntity[]> {
		return await this.productRepository.findByIds(params.ids);
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${ id } product`;
	}

	async remove(params: { id: number }): Promise<ProductEntity> {
		const { id } = params;
		const product = await this.findOne({ id: id });
		await this.productRepository.deleteById(id);
		return product;
	}

	private async syncAttributes(params: { oldAttributes: AssignedProductAttributeEntity[], newAttributes: CreateAssignedProductAttributeDto[], productId: number }) {
		const { oldAttributes, newAttributes, productId } = params;
		const oldIds = oldAttributes.map(value => value.productTypeAttribute.id);
		const newIds = newAttributes.map(value => value.productTypeAttributeId);
		const toDelete = oldIds.filter(id => !newIds.includes(id));
		const toAdd = newAttributes.filter(att => !oldIds.includes(att.productTypeAttributeId));
		const existing = oldAttributes.filter(att => newIds.includes(att.productTypeAttribute.id));
		// const toUpdate = existing.filter(att => att.sortOrder !== newAttributes.find(nAtt => nAtt.attributeId ===
		// att.attribute.id).sortOrder);
		const promises: Promise<any>[] = [];
		for ( const toDeleteElement of toDelete ) {
			promises.push(this.simpleAttributeService.deleteProductTypeAttribute({ productTypeId: ptId, attributeId: toDeleteElement }));
		}
		for ( const createProductTypeAttributeDto of toAdd ) {
			promises.push(this.simpleAttributeService.save({ productTypeId: ptId, dto: createProductTypeAttributeDto }));
		}


	}
}

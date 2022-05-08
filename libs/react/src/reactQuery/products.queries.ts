import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import {
	CreateProductDto,
	CreateProductVariantDto,
	ProductDto,
	ProductFilterResultDto,
	ProductsApi,
	ProductsApiProductsFindAllRequest,
	ProductVariantDto,
	ProductVariantsApi,
} from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productsSDK = new ProductsApi(defaultConfiguration);
const productVariationsSDK = new ProductVariantsApi(defaultConfiguration);

export function useProducts(options: ProductsApiProductsFindAllRequest) {
	return useQuery<ProductFilterResultDto>(
		NimaQueryCacheKeys.products.list(options),
		async () => {
			const res = await productsSDK.productsFindAll(options);
			return res.data;
		},
	);
}

export function useProductById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<ProductDto>(
		NimaQueryCacheKeys.products.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await productsSDK.productsGetById({ id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateProductMutation() {
	const client = useQueryClient();
	return useMutation<ProductDto,
		never,
		{ createProductDto: CreateProductDto }>(
		async ({ createProductDto }) => {
			const res = await productsSDK.productsCreate({
				createProductDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.products.all);
			},
		},
	);
}

export function useCreateProductVariationMutation() {
	const client = useQueryClient();
	return useMutation<ProductVariantDto,
		never,
		{
			productId: number,
			createProductVariantDto: CreateProductVariantDto,
		}>(
		async ({ createProductVariantDto, productId }) => {
			const res = await productVariationsSDK.productVariantCreate({
				productId: productId,
				createProductVariantDto: createProductVariantDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.products.all);
			},
		},
	);
}

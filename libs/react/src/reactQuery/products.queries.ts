import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import {
	CreateProductDto,
	ProductDto,
	ProductFilterResultDto,
	ProductsApi,
	ProductsApiProductsFindAllRequest,
} from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productsSDK = new ProductsApi(defaultConfiguration);

export function useProducts(options: ProductsApiProductsFindAllRequest) {
	return useQuery<ProductFilterResultDto>(
		NimaQueryCacheKeys.products.list(options),
		async () => {
			const res = await productsSDK.productsFindAll(options);
			return res.data;
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

import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import { CreateProductTypeDto, ProductTypeDto, ProductTypesApi } from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productTypesSDK = new ProductTypesApi(defaultConfiguration);


export function useProductTypes() {
	return useQuery<ProductTypeDto[]>(
		NimaQueryCacheKeys.productTypes.list(),
		async () => {
			const res = await productTypesSDK.productTypesFindAll();
			return res.data;
		},
		{},
	);
}

export function useProductTypeId(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<ProductTypeDto>(
		NimaQueryCacheKeys.productTypes.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await productTypesSDK.productTypesGetById({
				productTypeId: id,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateProductTypeMutation() {
	const client = useQueryClient();
	return useMutation<ProductTypeDto,
		never,
		{ createProductTypeDto: CreateProductTypeDto }>(
		async ({ createProductTypeDto }) => {
			const res = await productTypesSDK.productTypesCreate({
				createProductTypeDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}

export function useUpdateProductTypeMutation() {
	const client = useQueryClient();
	return useMutation<ProductTypeDto,
		never,
		{
			createProductTypeDto: CreateProductTypeDto
			productTypeId: number,
		}>(
		async ({ createProductTypeDto, productTypeId }) => {
			const res = await productTypesSDK.productTypesUpdate({
				createProductTypeDto: createProductTypeDto,
				productTypeId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}

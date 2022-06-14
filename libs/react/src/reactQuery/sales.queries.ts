import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CreateDiscountSaleDto,
	DiscountAddCategoriesDto,
	DiscountAddCollectionsDto,
	DiscountAddProductsDto,
	DiscountApi,
	DiscountSaleDto,
	UpdateDiscountDto,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const discountApi = new DiscountApi(defaultConfiguration);


export function useSales() {
	return useQuery<DiscountSaleDto[]>(
		NimaQueryCacheKeys.sales.list(),
		async () => {
			const res = await discountApi.discountSalesFindAll();
			return res.data;
		},
		{},
	);
}


export function useSaleById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<DiscountSaleDto>(
		NimaQueryCacheKeys.sales.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await discountApi.discountSalesFindOne({
				id,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{ createDiscountSaleDto: CreateDiscountSaleDto }>(
		async ({ createDiscountSaleDto }) => {
			const res = await discountApi.discountSalesCreate({
				createDiscountSaleDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.all);
			},
		},
	);
}

export function useUpdateSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number,
			updateDiscountDto: UpdateDiscountDto
		}>(
		async ({ updateDiscountDto, id }) => {
			const res = await discountApi.discountSalesUpdate({
				id,
				updateDiscountDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.all);
			},
		},
	);
}

export function useAddProductToSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			discountAddProductsDto: DiscountAddProductsDto
		}>(
		async ({ id, discountAddProductsDto }) => {
			const res = await discountApi.discountSalesAddProducts({
				id,
				discountAddProductsDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}


export function useRemoveProductFromSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			productId: number
		}>(
		async ({ id, productId }) => {
			const res = await discountApi.discountSalesRemoveProduct({
				id,
				productId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}


export function useAddCollectionsToSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			discountAddCollectionsDto: DiscountAddCollectionsDto
		}>(
		async ({ id, discountAddCollectionsDto }) => {
			const res = await discountApi.discountSalesAddCollections({
				id,
				discountAddCollectionsDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}


export function useRemoveCollectionsFromSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			collectionId: number
		}>(
		async ({ id, collectionId }) => {
			const res = await discountApi.discountSalesRemoveCollection({
				id,
				collectionId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}


export function useAddCategoryToSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			discountAddCategoriesDto: DiscountAddCategoriesDto
		}>(
		async ({ id, discountAddCategoriesDto }) => {
			const res = await discountApi.discountSalesAddCategories({
				id,
				discountAddCategoriesDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}


export function useRemoveCategoryFromSaleMutation() {
	const client = useQueryClient();
	return useMutation<DiscountSaleDto,
		never,
		{
			id: number
			categoryId: number
		}>(
		async ({ id, categoryId }) => {
			const res = await discountApi.discountSalesRemoveCategory({
				id,
				categoryId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.sales.id(variables.id));
			},
		},
	);
}

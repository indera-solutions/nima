import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CreateDiscountVoucherDto,
	DiscountAddCategoriesDto,
	DiscountAddCollectionsDto,
	DiscountAddProductsDto,
	DiscountVoucherDto,
	UpdateDiscountVoucherDto,
	VouchersApi,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const vouchersApi = new VouchersApi(defaultConfiguration);


export function useVouchers() {
	return useQuery<DiscountVoucherDto[]>(
		NimaQueryCacheKeys.vouchers.list(),
		async () => {
			const res = await vouchersApi.discountVoucherFindAll();
			return res.data;
		},
		{},
	);
}


export function useVoucherById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<DiscountVoucherDto>(
		NimaQueryCacheKeys.vouchers.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await vouchersApi.discountVoucherFindOne({
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


export function useCreateVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{ createDiscountVoucherDto: CreateDiscountVoucherDto }>(
		async ({ createDiscountVoucherDto }) => {
			const res = await vouchersApi.discountVoucherCreate({
				createDiscountVoucherDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.all);
			},
		},
	);
}

export function useUpdateVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number,
			updateDiscountVoucherDto: UpdateDiscountVoucherDto
		}>(
		async ({ updateDiscountVoucherDto, id }) => {
			const res = await vouchersApi.discountVoucherUpdate({
				id,
				updateDiscountVoucherDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.all);
			},
		},
	);
}

export function useAddProductToVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			discountAddProductsDto: DiscountAddProductsDto
		}>(
		async ({ id, discountAddProductsDto }) => {
			const res = await vouchersApi.discountVoucherAddProducts({
				id,
				discountAddProductsDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}


export function useRemoveProductFromVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			productId: number
		}>(
		async ({ id, productId }) => {
			const res = await vouchersApi.discountVoucherRemoveProduct({
				id,
				productId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}


export function useAddCollectionsToVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			discountAddCollectionsDto: DiscountAddCollectionsDto
		}>(
		async ({ id, discountAddCollectionsDto }) => {
			const res = await vouchersApi.discountVoucherAddCollections({
				id,
				discountAddCollectionsDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}


export function useRemoveCollectionsFromVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			collectionId: number
		}>(
		async ({ id, collectionId }) => {
			const res = await vouchersApi.discountVoucherRemoveCollection({
				id,
				collectionId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}


export function useAddCategoryToVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			discountAddCategoriesDto: DiscountAddCategoriesDto
		}>(
		async ({ id, discountAddCategoriesDto }) => {
			const res = await vouchersApi.discountVoucherAddCategories({
				id,
				discountAddCategoriesDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}


export function useRemoveCategoryFromVoucherMutation() {
	const client = useQueryClient();
	return useMutation<DiscountVoucherDto,
		never,
		{
			id: number
			categoryId: number
		}>(
		async ({ id, categoryId }) => {
			const res = await vouchersApi.discountVoucherRemoveCategory({
				id,
				categoryId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.vouchers.id(variables.id));
			},
		},
	);
}

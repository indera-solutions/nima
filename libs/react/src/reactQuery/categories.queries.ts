import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import { CategoriesApi, CategoryDto, CreateCategoryDto } from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const categoriesSDK = new CategoriesApi(defaultConfiguration);


export function useCategories() {
	return useQuery<CategoryDto[]>(
		NimaQueryCacheKeys.categories.list(),
		async () => {
			const res = await categoriesSDK.categoriesFindAll();
			return res.data;
		},
		{},
	);
}


export function useCategoryId(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<CategoryDto>(
		NimaQueryCacheKeys.categories.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await categoriesSDK.categoriesFindOne({
				id: id,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}

export function useCategoryAncestorsById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<CategoryDto>(
		NimaQueryCacheKeys.categories.ancestors(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await categoriesSDK.categoriesFindAncestorsById({
				id: id,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateCategoryMutation() {
	const client = useQueryClient();
	return useMutation<CategoryDto,
		never,
		{ createCategoryDto: CreateCategoryDto }>(
		async ({ createCategoryDto }) => {
			const res = await categoriesSDK.categoriesCreate({
				createCategoryDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.categories.all);
			},
		},
	);
}

export function useUpdateCategoryMutation() {
	const client = useQueryClient();
	return useMutation<CategoryDto,
		never,
		{
			createCategoryDto: CreateCategoryDto
			categoryId: number,
		}>(
		async ({ createCategoryDto, categoryId }) => {
			const res = await categoriesSDK.categoriesUpdate({
				updateCategoryDto: createCategoryDto,
				id: categoryId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.categories.all);
			},
		},
	);
}

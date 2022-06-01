import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CollectionDto,
	CollectionsApi,
	CreateCollectionDto,
	CreateCollectionProductDto,
	UpdateCollectionDto,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const collectionsApi = new CollectionsApi(defaultConfiguration);


export function useCollections() {
	return useQuery<CollectionDto[]>(
		NimaQueryCacheKeys.collections.list(),
		async () => {
			const res = await collectionsApi.collectionsFindAll();
			return res.data;
		},
		{},
	);
}


export function useCollectionById(id?: number, options?: { refetchInterval: number | false }) {
	const client = useQueryClient();

	return useQuery<CollectionDto>(
		NimaQueryCacheKeys.collections.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await collectionsApi.collectionsFindOne({
				collectionId: id,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
			onSuccess: (data => {
				console.log(id, data);
				client.setQueryData(NimaQueryCacheKeys.collections.products(id), data.products);
			}),
		},
	);
}

export function useCollectionProductsById(id?: number, options?: { refetchInterval: number | false }) {
	const client = useQueryClient();
	return client.getQueryData(NimaQueryCacheKeys.collections.products(id));
}


export function useCreateCollectionMutation() {
	const client = useQueryClient();
	return useMutation<CollectionDto,
		never,
		{ createCollectionDto: CreateCollectionDto }>(
		async ({ createCollectionDto }) => {
			const res = await collectionsApi.collectionsCreate({
				createCollectionDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.collections.all);
			},
		},
	);
}

export function useUpdateCollectionMutation() {
	const client = useQueryClient();
	return useMutation<CollectionDto,
		never,
		{
			updateCollectionDto: UpdateCollectionDto
			collectionId: number,
		}>(
		async ({ updateCollectionDto, collectionId }) => {
			const res = await collectionsApi.collectionsUpdate({
				updateCollectionDto,
				collectionId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.collections.all);
			},
		},
	);
}


export function useAddProductToCollectionMutation() {
	const client = useQueryClient();
	return useMutation<CollectionDto,
		never,
		{
			collectionId: number
			createCollectionProductDto: CreateCollectionProductDto[]
		}>(
		async ({ collectionId, createCollectionProductDto }) => {
			const res = await collectionsApi.collectionsAddProducts({
				collectionId,
				createCollectionProductDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.collections.id(variables.collectionId));
			},
		},
	);
}


export function useRemoveProductFromCollectionMutation() {
	const client = useQueryClient();
	return useMutation<CollectionDto,
		never,
		{
			collectionId: number
			productId: number
		}>(
		async ({ collectionId, productId }) => {
			const res = await collectionsApi.collectionsRemoveProduct({
				collectionId,
				productId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.collections.id(variables.collectionId));
			},
		},
	);
}

import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import { MediaApi, MediaDto, MediaListPaginated } from '@nima-cms/sdk';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';

const mediaSdk = new MediaApi(defaultConfiguration);

export function useMediaPaginated(options: { pageSize?: number, search?: string }) {
	return useInfiniteQuery<MediaListPaginated>(
		NimaQueryCacheKeys.media.list(options),
		async ({ pageParam = 1 }) => {
			const res = await mediaSdk.mediaListMedia({
				pageSize: options.pageSize,
				page: pageParam,
				search: options.search || undefined,
			});
			return res.data;
		},
		{
			getNextPageParam: (lastPage) => {
				return (lastPage.pageSize * lastPage.pageNumber < lastPage.totalCount) ? lastPage.pageNumber + 1 : undefined;
			},
			keepPreviousData: true,
		},
	);
}

export function useMediaById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<MediaDto>(
		NimaQueryCacheKeys.media.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await mediaSdk.mediaGetById({ id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}

export function useMediaUploadMutation(options: { onProgress?: (newProgress: number, fileName: string) => void }) {
	const client = useQueryClient();
	return useMutation<MediaDto,
		never,
		{
			file: File,
		}>(
		async ({ file }) => {
			const res = await mediaSdk.mediaCreateMedia({
				file: file,
			}, {
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					if ( options.onProgress ) {
						options.onProgress(percentCompleted, file.name);
					}
				},
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.media.all);
			},
		},
	);

}


export function useRemoveMediaMutation() {
	const client = useQueryClient();
	return useMutation<MediaDto,
		never,
		{
			id: number,
		}>(
		async ({ id }) => {
			const res = await mediaSdk.mediaDeleteById({
				id,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.media.all);
			},
		},
	);
}

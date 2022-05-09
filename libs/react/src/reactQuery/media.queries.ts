import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import { MediaApi, MediaDto, MediaListPaginated } from '@nima/sdk';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

const mediaSdk = new MediaApi(defaultConfiguration);

export function useMediaPaginated(options: { pageSize?: number }) {
	return useInfiniteQuery<MediaListPaginated>(
		NimaQueryCacheKeys.media.list(options),
		async ({ pageParam = 1 }) => {
			const res = await mediaSdk.mediaListMedia({
				pageSize: options.pageSize,
				page: pageParam,
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
				client.invalidateQueries(NimaQueryCacheKeys.categories.all);
			},
		},
	);

}

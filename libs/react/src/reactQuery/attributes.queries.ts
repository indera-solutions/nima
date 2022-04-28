import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import { AttributeDto, AttributesApi, CreateAttributeDto } from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const attributesSDK = new AttributesApi(defaultConfiguration);

export function useAttributes() {
	return useQuery<AttributeDto[]>(
		NimaQueryCacheKeys.attributes.list(),
		async () => {
			const res = await attributesSDK.attributesFindAll();
			return res.data;
		},
		{},
	);
}

export function useAttributeById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<AttributeDto>(
		NimaQueryCacheKeys.attributes.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await attributesSDK.attributesGetById({ attributeId: id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}

export function useCreateAttributeMutation() {
	const client = useQueryClient();
	return useMutation<AttributeDto,
		never,
		{ createAttribute: CreateAttributeDto }>(
		async ({ createAttribute }) => {
			const res = await attributesSDK.attributesSave({
				createAttributeDto: createAttribute,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.attributes.all);
			},
		},
	);
}

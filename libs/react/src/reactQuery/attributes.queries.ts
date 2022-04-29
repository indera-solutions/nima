import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import {
	AttributeDto,
	AttributesApi,
	AttributeValueDto,
	AttributeValuesApi,
	CreateAttributeDto,
	CreateAttributeValueDto,
} from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const attributesSDK = new AttributesApi(defaultConfiguration);
const attributeValuesSDK = new AttributeValuesApi(defaultConfiguration);

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
		{ createAttributeDto: CreateAttributeDto }>(
		async ({ createAttributeDto }) => {
			const res = await attributesSDK.attributesSave({
				createAttributeDto,
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

export function useUpdateAttributeMutation() {
	const client = useQueryClient();
	return useMutation<AttributeDto,
		never,
		{
			updateAttributeDto: CreateAttributeDto
			attributeId: number,
		}>(
		async ({ updateAttributeDto, attributeId }) => {
			const res = await attributesSDK.attributesUpdateAttribute({
				createAttributeDto: updateAttributeDto,
				attributeId,
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


export function useAttributeValues(attributeId?: number, options?: { refetchInterval: number | false }) {
	return useQuery<AttributeValueDto[]>(
		NimaQueryCacheKeys.attributes.values(attributeId),
		async () => {
			if ( !attributeId ) throw new Error('invalid attribute id');
			const res = await attributeValuesSDK.attributeValuesGetValuesOfAttributeById({
				attributeId: attributeId,
			});
			return res.data;
		},
		{
			...options,
			enabled: !!attributeId,
		},
	);
}

export function useAddAttributeValueMutation() {
	const client = useQueryClient();
	return useMutation<AttributeValueDto,
		never,
		{
			createAttributeValue: CreateAttributeValueDto,
			attributeId: number
		}>(
		async ({ createAttributeValue, attributeId }) => {
			const res = await attributeValuesSDK.attributeValuesSave({
				attributeId: attributeId,
				createAttributeValueDto: createAttributeValue,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.attributes.id(variables.attributeId));
			},
		},
	);
}

import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	AttributeDto,
	AttributesApi,
	AttributeValueDto,
	AttributeValuesApi,
	CreateAttributeDto,
	CreateAttributeValueDto,
	UpdateAttributeValueDto,
} from '@nima-cms/sdk';
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
			const res = await attributesSDK.attributesCreate({
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
			const res = await attributesSDK.attributesUpdate({
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


export function useRemoveAttributeValueMutation() {
	const client = useQueryClient();
	return useMutation<AttributeValueDto,
		never,
		{
			attributeId: number,
			attributeValueId: number
		}>(
		async ({ attributeValueId, attributeId }) => {
			const res = await attributeValuesSDK.attributeValuesDeleteValueByID({
				attributeId: attributeId,
				valueId: attributeValueId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.attributes.id(variables.attributeId));
				client.invalidateQueries(NimaQueryCacheKeys.products.all);
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}


export function useUpdateAttributeValueMutation() {
	const client = useQueryClient();
	return useMutation<AttributeValueDto,
		never,
		{
			attributeId: number,
			attributeValueId: number,
			updateAttributeValueDto: UpdateAttributeValueDto
		}>(
		async ({ attributeValueId, attributeId, updateAttributeValueDto }) => {
			const res = await attributeValuesSDK.attributeValuesPatchValue({
				attributeId: attributeId,
				valueId: attributeValueId,
				updateAttributeValueDto: updateAttributeValueDto,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.attributes.id(variables.attributeId));
				client.invalidateQueries(NimaQueryCacheKeys.products.all);
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}

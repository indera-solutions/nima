import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CreateShippingMethodDto,
	CreateShippingZoneDto,
	ShippingApi,
	ShippingMethodDto,
	ShippingZoneDto,
	UpdateShippingMethodDto,
	UpdateShippingZoneDto,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const shippingSDK = new ShippingApi(defaultConfiguration);


export function useShippingMethods() {
	return useQuery<ShippingMethodDto[]>(
		NimaQueryCacheKeys.shipping.list(),
		async () => {
			const res = await shippingSDK.shippingGetAll({});
			return res.data;
		},
		{},
	);
}

export function useShippingMethodById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<ShippingMethodDto>(
		NimaQueryCacheKeys.shipping.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await shippingSDK.shippingGetOne({ methodId: id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}

export function useCreateShippingMethodMutation() {
	const client = useQueryClient();
	return useMutation<ShippingMethodDto,
		never,
		{ createShippingMethodDto: CreateShippingMethodDto }>(
		async ({ createShippingMethodDto }) => {
			const res = await shippingSDK.shippingCreate({
				createShippingMethodDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.all);
			},
		},
	);
}

export function useUpdateShippingMethodMutation() {
	const client = useQueryClient();
	return useMutation<ShippingMethodDto,
		never,
		{
			updateShippingMethodDto: UpdateShippingMethodDto
			id: number,
		}>(
		async ({ updateShippingMethodDto, id }) => {
			const res = await shippingSDK.shippingUpdateMethod({
				updateShippingMethodDto,
				methodId: id,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.all);
			},
		},
	);
}


export function useCreateShippingZoneMutation() {
	const client = useQueryClient();
	return useMutation<ShippingZoneDto,
		never,
		{
			methodId: number
			createShippingZoneDto: CreateShippingZoneDto
		}>(
		async ({ methodId, createShippingZoneDto }) => {
			const res = await shippingSDK.shippingCreateZone({
				createShippingZoneDto,
				methodId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.all);
			},
		},
	);
}

export function useUpdateShippingZoneMutation() {
	const client = useQueryClient();
	return useMutation<ShippingZoneDto,
		never,
		{
			id: number
			updateShippingZoneDto: UpdateShippingZoneDto
			methodId: number,
		}>(
		async ({ updateShippingZoneDto, id, methodId }) => {
			const res = await shippingSDK.shippingUpdateZone({
				updateShippingZoneDto,
				id,
				methodId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.all);
			},
		},
	);
}

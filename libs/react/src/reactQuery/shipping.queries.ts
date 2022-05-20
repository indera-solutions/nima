import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CreateShippingMethodDto,
	CreateShippingRateDto,
	CreateShippingZoneDto,
	ShippingApi,
	ShippingMethodDto,
	ShippingRateDto,
	ShippingZoneDto,
	UpdateShippingMethodDto,
	UpdateShippingRateDto,
	UpdateShippingZoneDto,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const shippingSDK = new ShippingApi(defaultConfiguration);


export function useShippingMethods() {
	return useQuery<ShippingMethodDto[]>(
		NimaQueryCacheKeys.shipping.list(),
		async () => {
			const res = await shippingSDK.shippingMethodGetAll({});
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
			const res = await shippingSDK.shippingMethodGetOne({ methodId: id });
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
			const res = await shippingSDK.shippingMethodCreate({
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
			const res = await shippingSDK.shippingMethodUpdateMethod({
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
			const res = await shippingSDK.shippingZonesCreateZone({
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
			const res = await shippingSDK.shippingZonesUpdateZone({
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


export function useCreateShippingRateMutation() {
	const client = useQueryClient();
	return useMutation<ShippingRateDto,
		never,
		{
			methodId: number
			zoneId: number
			createShippingRateDto: CreateShippingRateDto
		}>(
		async ({ methodId, createShippingRateDto, zoneId }) => {
			const res = await shippingSDK.shippingRatesCreateRate({
				createShippingRateDto,
				zoneId,
				methodId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.id(variables.methodId));
			},
		},
	);
}

export function useUpdateShippingRateMutation() {
	const client = useQueryClient();
	return useMutation<ShippingRateDto,
		never,
		{
			rateId: number
			zoneId: number
			updateShippingRateDto: UpdateShippingRateDto
			methodId: number,
		}>(
		async ({ updateShippingRateDto, zoneId, rateId, methodId }) => {
			const res = await shippingSDK.shippingRatesUpdateRate({
				updateShippingRateDto,
				zoneId,
				methodId,
				id: rateId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.id(variables.methodId));
			},
		},
	);
}

export function useDeleteShippingRateMutation() {
	const client = useQueryClient();
	return useMutation<ShippingRateDto,
		never,
		{
			rateId: number
			zoneId: number
			methodId: number,
		}>(
		async ({ zoneId, rateId, methodId }) => {
			const res = await shippingSDK.shippingRatesDeleteRate({
				zoneId,
				methodId,
				id: rateId,
			});
			return res.data;
		},
		{
			onSuccess: (data, variables, context) => {
				client.invalidateQueries(NimaQueryCacheKeys.shipping.id(variables.methodId));
			},
		},
	);
}

import { OrderDto, OrderListPaginated, OrdersApi, UpdateOrderStatusDto } from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { defaultConfiguration } from '../reactQueryCommons';
import { NimaQueryCacheKeys } from './queryKeys';

const orderSDK = new OrdersApi(defaultConfiguration);

export function useOrders() {
	return useQuery<OrderListPaginated>(
		NimaQueryCacheKeys.orders.list(),
		async () => {
			const res = await orderSDK.orderFindAll();
			return res.data;
		},
		{},
	);
}

export function useOrderById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<OrderDto>(
		NimaQueryCacheKeys.orders.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await orderSDK.orderFindOne({ id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateOrderFromCheckoutMutation() {
	const client = useQueryClient();
	return useMutation<OrderDto,
		never,
		{ token: string }>(
		async ({ token }) => {
			const res = await orderSDK.orderCreateFromCheckout({
				createOrderFromCheckoutDto: {
					token: token,
				},
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
				client.invalidateQueries(NimaQueryCacheKeys.orders.all);
			},
		},
	);
}


export function useUpdateOrderStatusMutation() {
	const client = useQueryClient();
	return useMutation<OrderDto,
		never,
		{
			id: number,
			updateOrderStatusDto: UpdateOrderStatusDto
		}>(
		async ({ id, updateOrderStatusDto }) => {
			const res = await orderSDK.orderUpdateStatus({
				id,
				updateOrderStatusDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.orders.all);
			},
		},
	);
}

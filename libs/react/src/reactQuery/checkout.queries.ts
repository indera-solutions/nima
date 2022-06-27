import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import {
	CheckoutApi,
	CheckoutDto,
	CreateAddressDto,
	CreateCheckoutDto,
	UpdateCheckoutDto,
	UpdateCheckoutLineDto,
	UpdateCheckoutVoucherDto,
} from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const checkoutSDK = new CheckoutApi(defaultConfiguration);

const TOKEN_KEY = 'checkout_token';

export function useCurrentCheckout() {
	return useQuery<CheckoutDto | undefined>(
		NimaQueryCacheKeys.checkout.current(),
		async () => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) return undefined;
			try {
				const res = await checkoutSDK.checkoutFindOne({
					token,
				});
				return res.data;

			} catch ( e: any ) {
				if ( e?.response?.data?.message === 'CHECKOUT_NOT_FOUND' ) {
					localStorage.removeItem(TOKEN_KEY);
				}
				return undefined;
			}
		},
		{},
	);
}


export function useCreateCheckoutMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{ createCheckoutDto: CreateCheckoutDto }>(
		async ({ createCheckoutDto }) => {
			const res = await checkoutSDK.checkoutCreate({
				createCheckoutDto,
			});
			localStorage.setItem(TOKEN_KEY, res.data.token);
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}


export function useUpdateCheckoutLinesMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{ updateCheckoutLineDto: UpdateCheckoutLineDto }>(
		async ({ updateCheckoutLineDto }) => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) throw new Error('CHECKOUT_NOT_INIT');
			const res = await checkoutSDK.checkoutUpdateLines({
				token: token,
				updateCheckoutLineDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}


export function useUpdateCheckoutAddressMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{
			createAddressDto: CreateAddressDto;
			shipping?: boolean;
			billing?: boolean;
		}>(
		async ({ createAddressDto, shipping, billing }) => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) throw new Error('CHECKOUT_NOT_INIT');
			const res = await checkoutSDK.checkoutUpdateAddress({
				token: token,
				createAddressDto,
				shipping,
				billing,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}

export function useUpdateCheckoutInfoMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{
			updateCheckoutDto: UpdateCheckoutDto
		}>(
		async ({ updateCheckoutDto }) => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) throw new Error('CHECKOUT_NOT_INIT');
			const res = await checkoutSDK.checkoutUpdate({
				token: token,
				updateCheckoutDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}

export function useUpdateCheckoutVoucherMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{
			updateCheckoutVoucherDto: UpdateCheckoutVoucherDto
		}>(
		async ({ updateCheckoutVoucherDto }) => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) throw new Error('CHECKOUT_NOT_INIT');
			const res = await checkoutSDK.checkoutUpdateVoucher({
				token: token,
				updateCheckoutVoucherDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}


export function useDeleteCheckoutMutation() {
	const client = useQueryClient();
	return useMutation<CheckoutDto,
		never,
		{}>(
		async () => {
			const token = localStorage.getItem(TOKEN_KEY);
			if ( !token ) throw new Error('CHECKOUT_NOT_INIT');
			const res = await checkoutSDK.checkoutDeleteCheckout({
				token: token,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.checkout.current());
			},
		},
	);
}


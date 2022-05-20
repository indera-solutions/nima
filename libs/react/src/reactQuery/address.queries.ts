import { AddressApi, AddressDto, CreateAddressDto } from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { defaultConfiguration } from '../reactQueryCommons';
import { NimaQueryCacheKeys } from './queryKeys';

const addressSDK = new AddressApi(defaultConfiguration);


export function useAddressById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<AddressDto>(
		NimaQueryCacheKeys.address.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await addressSDK.addressGetById({ id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useUpdateAddressMutation() {
	const client = useQueryClient();
	return useMutation<AddressDto,
		never,
		{
			id: number,
			createAddressDto: CreateAddressDto

		}>(
		async ({ id, createAddressDto }) => {
			const res = await addressSDK.addressUpdateById({
				id,
				createAddressDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.address.all);
			},
		},
	);
}

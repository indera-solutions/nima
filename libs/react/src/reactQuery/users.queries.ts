import { defaultConfiguration, NimaQueryCacheKeys } from '@nima-cms/react';
import { CreateUserDto, UpdateUserDto, UserDto, UsersApi } from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const usersSDK = new UsersApi(defaultConfiguration);

export function useUsers() {
	return useQuery<UserDto[]>(
		NimaQueryCacheKeys.users.list(),
		async () => {
			const res = await usersSDK.usersFindAll();
			return res.data;
		},
		{},
	);
}

export function useUserById(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<UserDto>(
		NimaQueryCacheKeys.users.id(id),
		async () => {
			if ( !id ) throw new Error('Invalid id');
			const res = await usersSDK.usersFindOne({ id });
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}

export function useCreateUserMutation() {
	const client = useQueryClient();
	return useMutation<UserDto,
		never,
		{ createUserDto: CreateUserDto }>(
		async ({ createUserDto }) => {
			const res = await usersSDK.usersCreate({
				createUserDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.users.all);
			},
		},
	);
}

export function useUpdateUserMutation() {
	const client = useQueryClient();
	return useMutation<UserDto,
		never,
		{
			updateUserDto: UpdateUserDto
			userId: number,
		}>(
		async ({ updateUserDto, userId }) => {
			const res = await usersSDK.usersUpdate({
				updateUserDto,
				id: userId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.users.all);
			},
		},
	);
}


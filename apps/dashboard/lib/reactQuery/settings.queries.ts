import { Settings } from '@nima/interfaces';
import { useSession } from '@nima/react';
import { SettingsSdk } from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NimaQueryCacheKeys } from './queryKeys';

const settingsSDK = new SettingsSdk();

export function useSettings() {
	const { state } = useSession();
	return useQuery(NimaQueryCacheKeys.settings, async () => {
		try {
			return await settingsSDK.getSettings();
		} catch ( e: any ) {
			if ( e.response.data.message === 'SETTINGS_NOT_INITIALIZED' ) {
				return undefined;
			}
			throw e;
		}
	}, {
		enabled: state === 'authenticated',
		retry: false,
	});
}

export function useUpdateSettings() {
	const client = useQueryClient();
	return useMutation<Settings, never, { settings: Settings }>(
		async ({ settings }) => {
			return settingsSDK.updateSettings(settings);
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.settings);
			},
		},
	);
}

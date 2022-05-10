import { defaultConfiguration, useSession } from '@nima-cms/react';
import { CoreApi, SettingsDto } from '@nima-cms/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { NimaQueryCacheKeys } from './queryKeys';

const coreApi = new CoreApi(defaultConfiguration);

export function useSettings() {
	const { state } = useSession();
	return useQuery<SettingsDto | undefined>(NimaQueryCacheKeys.settings, async () => {
		try {
			const res = await coreApi.settingsGetSettings();
			return res.data;
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
	return useMutation<SettingsDto, never, { settings: SettingsDto }>(
		async ({ settings }) => {
			const res = await coreApi.settingsUpdateSettings({
				settingsDto: settings,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.settings);
			},
		},
	);
}

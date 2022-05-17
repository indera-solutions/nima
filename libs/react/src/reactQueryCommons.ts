import { getAccessToken } from '@nima-cms/react';
import { Configuration } from '@nima-cms/sdk';

export const defaultConfiguration = new Configuration({
	accessToken: () => getAccessToken() || '',
	basePath: process.env['NEXT_PUBLIC_BASE_PATH'],
});

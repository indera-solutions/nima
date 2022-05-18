import { getAccessToken } from '@nima-cms/react';
import { Configuration } from '@nima-cms/sdk';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const defaultConfiguration = new Configuration({
	accessToken: () => getAccessToken() || '',
	basePath: publicRuntimeConfig.basePath,
});

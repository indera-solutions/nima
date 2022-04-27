import { getAccessToken } from '@nima/react';
import { Configuration } from '@nima/sdk';

export const defaultConfiguration = new Configuration({
	accessToken: () => getAccessToken() || '',
	// basePath: '', TODO get this through environmental variable
});

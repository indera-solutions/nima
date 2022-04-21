import { ACCESS_TOKEN } from './providers';

const axios = require('axios').default;

export function registerAxiosAuthHeaderInterceptor() {
	axios.interceptors.request.use(
		(config: any) => {
			const token = sessionStorage.getItem(ACCESS_TOKEN);
			const auth = token ? `Bearer ${ token }` : '';
			config.headers.common['Authorization'] = auth;
			return config;
		},
		(error: any) => Promise.reject(error),
	);

}

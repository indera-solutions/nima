import { registerAxiosAuthHeaderInterceptor, SessionProvider } from '@nima/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdminLayout } from '../components';
import { adminRoutes } from '../lib/sidemenuItem';
import './styles.css';

registerAxiosAuthHeaderInterceptor();


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30000,
			refetchOnWindowFocus: false,
		},
	},
});


function CustomApp({ Component, pageProps }: AppProps) {

	return (
		<>
			<Head>
				<title>Welcome to dashboard!</title>
			</Head>
			<main className="app">
				<QueryClientProvider client={ queryClient }>
					<SessionProvider>
						<AdminLayout links={ adminRoutes }>
							<Component { ...pageProps } />
						</AdminLayout>
					</SessionProvider>
				</QueryClientProvider>
			</main>
		</>
	);
}

export default CustomApp;

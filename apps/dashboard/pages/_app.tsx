import { LanguageContextProvider, SessionProvider } from '@nima-cms/react';
import App, { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AdminLayout } from '../components';
import { adminRoutes } from '../lib/sidemenuItem';
import './editor.css';
import './richTextStyles.css';
import './styles.css';

function errorLogging(error: any) {
	if ( error?.response?.data?.message ) {
		if ( Array.isArray(error.response.data.message) ) {
			for ( const e of error.response.data.message ) {
				toast.error(e);
			}
		} else {
			toast.error(error.response.data.message);
		}
	} else if ( error.message ) {
		toast.error(`Something went wrong: ${ error.message }`);
	} else {
		toast.error(`Something went wrong`);
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30000,
			refetchOnWindowFocus: false,
			onError: errorLogging,
		},
		mutations: {
			onError: errorLogging,
		},
	},
});


function CustomApp({ Component, pageProps }: AppProps) {

	return (
		<>
			<Head>
				<title>Nima CMS | Indera Business Solutions</title>
			</Head>
			<main className="app">
				<QueryClientProvider client={ queryClient }>
					<SessionProvider>
						<LanguageContextProvider>
							<AdminLayout links={ adminRoutes }>
								<Component { ...pageProps } />
							</AdminLayout>
						</LanguageContextProvider>
					</SessionProvider>
				</QueryClientProvider>
			</main>
			<ToastContainer/>
		</>
	);
}

// We use getInitialProps here to be able to use dynamic env from runtime
CustomApp.getInitialProps = async (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext);

	return { ...appProps };
};

export default CustomApp;

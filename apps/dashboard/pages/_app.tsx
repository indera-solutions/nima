import { registerAxiosAuthHeaderInterceptor, SessionProvider } from '@nima/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

registerAxiosAuthHeaderInterceptor();


function CustomApp({ Component, pageProps }: AppProps) {

	return (
		<>
			<Head>
				<title>Welcome to dashboard!</title>
			</Head>
			<main className="app">
				<SessionProvider>
					<Component { ...pageProps } />
				</SessionProvider>
			</main>
		</>
	);
}

export default CustomApp;

import { getCsrfToken, signOut, useSession } from 'next-auth/react';
import styles from './index.module.scss';

const axios = require('axios').default;

interface IndexProps {
	csrfToken;
}

export function Index(props: IndexProps) {
	const { data: session, status, ...rest } = useSession();

	console.log('session', session);
	console.log('status', status);
	console.log('rest', rest);


	async function onGetProtected() {
		const res = await axios.get('/api/protected');
		console.log('res', res);
	}

	if ( status === 'authenticated' ) {
		return <p>
			Signed in as { session.user.email }
			{ JSON.stringify(session) }
			<button onClick={ () => signOut({
				callbackUrl: '/auth/signin',
			}) }>Logout
			</button>
			<div style={ { marginTop: 30 } }>
				<button onClick={ onGetProtected }>get protected</button>
			</div>
		</p>;
	}

	return (
		<div className={ styles.page }>
			Not authenticated
			{/*<button onClick={ () => signIn() }>Sign in</button>*/ }
			{/*<button onClick={ () => signIn('cognito') }>Sign in cognito</button>*/ }
			{/*<button onClick={ onGetProtected }>get protected</button>*/ }

		</div>
	);
}

export default Index;

export async function getServerSideProps(context) {
	const csrfToken = await getCsrfToken(context);
	return {
		props: { csrfToken: csrfToken || null },
	};
}

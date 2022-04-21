import { useAuth, useSession } from '@nima/react';
import styles from './index.module.scss';


interface IndexProps {
}

export default function Index(props: IndexProps) {

	const { session, state } = useSession();
	const auth = useAuth();

	if ( state === 'authenticated' ) {

		return <p>
			Signed in as { session.email }
			{ JSON.stringify(session) }
			<button onClick={ () => auth.logout() }>Logout
			</button>
		</p>;
	}

	return (
		<div className={ styles.page }>
			Not authenticated
			<button onClick={ () => {
				auth.login('stavros.zarpas@gmail.com', 'xxxx');
			} }>Login</button>

		</div>
	);
}

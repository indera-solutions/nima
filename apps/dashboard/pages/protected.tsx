import { signOut, useSession } from 'next-auth/react';
import React from 'react';

interface ProtectedProps {

}

export default function Protected(props: ProtectedProps) {
	const { data: session, status, ...rest } = useSession();
	console.log(session);
	console.log(rest);
	if ( status === 'authenticated' ) {
		return <p>
			Signed in as { session.user.email }
			{ JSON.stringify(session) }
			<button onClick={ () => signOut() }>Logout</button>
		</p>;
	}

	return (
		<>
			<h1>Protected</h1>
		</>
	);
}

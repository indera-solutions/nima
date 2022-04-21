import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

interface IndexProps {
	csrfToken;
}

export function Index(props: IndexProps) {
	const router = useRouter();

	async function onLogin() {
		const res = await signIn('credentials', {
			redirect: false,
			email: 'stavros.zarpas@gmail.com',
			password: 'xxxx',
		});
		console.log(res);
		if ( res.ok ) router.push('/');
	}

	return (
		<div>
			Login
			{/*<form method='post' action='/api/auth/callback/credentials'>*/ }
			{/*	<input name='csrfToken' type='hidden' defaultValue={ props.csrfToken } />*/ }
			{/*	<label>*/ }
			{/*		Username*/ }
			{/*		<input name='email' type='text' value={ 'stavros.z@hotmail.com' } />*/ }
			{/*	</label>*/ }
			{/*	<label>*/ }
			{/*		Password*/ }
			{/*		<input name='password' type='password' value={ 'Asds123!.' } />*/ }
			{/*	</label>*/ }
			{/*	<button type='submit'>Sign in</button>*/ }
			{/*</form>*/ }
			<button onClick={ onLogin }>login</button>
		</div>
	);
}

export default Index;

export async function getServerSideProps(context) {
	const csrfToken = await getCsrfToken(context);
	return {
		props: { csrfToken },
	};
}

import { useRouter } from 'next/router';
import { login } from '../../lib/auth';

interface IndexProps {
	csrfToken;
}

export function Index(props: IndexProps) {
	const router = useRouter();

	async function onLogin() {
		await login('stavros.zarpas@gmail.com', 'xxxx');
	}

	return (
		<div>
			Login
			<button onClick={ onLogin }>login</button>
		</div>
	);
}

export default Index;

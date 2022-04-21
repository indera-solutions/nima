import { AuthSdk } from '@nima/sdk';
import React, { useEffect } from 'react';

interface ProtectedProps {

}

const sdk = new AuthSdk();

export default function Protected(props: ProtectedProps) {

	useEffect(() => {
		getProfile();
	}, []);

	async function getProfile() {
		const pr = await sdk.getProfile();
		console.log(pr);
	}

	return (
		<>
			<h1>Protected</h1>
		</>
	);
}

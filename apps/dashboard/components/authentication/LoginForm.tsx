import { useAuth } from '@nima/react';
import React, { useState } from 'react';

interface LoginFormProps {

}

export function LoginForm(props: LoginFormProps) {

	const [email, setEmail] = useState<string>('test@email.com');
	const [password, setPassword] = useState<string>('xxxx');

	const { login } = useAuth();

	async function onSubmit() {
		await login(email, password);
	}

	return <div className="form-control w-full max-w-xs gap-4 py-20">
		<div>
			<label className="label">
				<span className="label-text">Email</span>
			</label>
			<input type="text" placeholder="Type here"
				   value={ email }
				   onChange={ (e) => setEmail(e.target.value) }
				   className="input input-bordered w-full max-w-xs"/>
		</div>
		<div>
			<label className="label">
				<span className="label-text">Password</span>
			</label>
			<input type="password" placeholder="Type here"
				   value={ password }
				   onChange={ (e) => setPassword(e.target.value) }
				   className="input input-bordered w-full max-w-xs"/>
		</div>
		<button className={ 'btn btn-primary' } onClick={ onSubmit }>Login</button>
	</div>;

}

import { UserSession } from '@nima/interfaces';
import { AuthSdk } from '@nima/sdk';
import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect, useMemo, useState } from 'react';


const authSdk = new AuthSdk();


type SessionState = 'authenticated' | 'unauthenticated' | 'loading';

interface SessionContextStructure {
	session?: UserSession,
	state: SessionState
	login: (email: string, password: string) => Promise<void>,
	refreshSession: () => void,
	logout: () => Promise<void>
}

export const ACCESS_TOKEN = 'access_token';


const SessionContext = React.createContext<SessionContextStructure>({
	session: undefined,
	state: 'loading',
	login: async (email: string, password: string) => {
		throw new Error('Not implemented');
	},
	refreshSession: () => {
		throw new Error('Not implemented');
	},
	logout: async () => {
		throw new Error('Not implemented');
	},
});
SessionContext.displayName = 'SessionContext';


interface SessionProviderProps {
	children: React.ReactNode;
}


export function SessionProvider(props: SessionProviderProps): React.ReactElement {
	const [session, setSession] = useState<UserSession | undefined>();
	const [state, setState] = useState<SessionState>('loading');

	useEffect(() => {
		refreshSession();
	}, []);

	function refreshSession() {
		if ( !window ) return;
		const access_token = localStorage.getItem(ACCESS_TOKEN);
		if ( access_token ) {
			const temp = jwtDecode<UserSession>(access_token);

			if ( !temp.exp || (temp.exp * 1000) < (new Date().getTime()) ) {
				logout();
				return;
			}
			setSession(temp);
			setState('authenticated');
		} else {
			setState('unauthenticated');
		}
	}

	async function login(email: string, password: string) {
		setState('loading');
		const res = await authSdk.login({ email, password });
		localStorage.setItem(ACCESS_TOKEN, res.access_token);
		refreshSession();
	}

	async function logout() {
		localStorage.removeItem(ACCESS_TOKEN);
		refreshSession();
	}


	return <SessionContext.Provider
		value={ {
			session,
			state,
			refreshSession,
			login,
			logout,
		} }
	>
		{ props.children }
	</SessionContext.Provider>;

}

export function useSession(): Pick<SessionContextStructure, 'session' | 'state'> {
	const context = useContext(SessionContext);
	return useMemo(() => ({
		session: context.state === 'authenticated' ? context.session : undefined,
		state: context.state,
	}), [context.session, context.state]);
}

export function useAuth(): Pick<SessionContextStructure, 'refreshSession' | 'login' | 'logout'> {
	const context = useContext(SessionContext);

	return {
		refreshSession: context.refreshSession,
		login: context.login,
		logout: context.logout,
	};
}



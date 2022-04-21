import { AuthSdk } from '@nima/sdk';
import jwt_decode from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authSdk = new AuthSdk();


export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'jsmith', value: 'stavros.zarpas@gmail.com' },
				password: { label: 'Password', type: 'password', value: 'xxxx' },
			},

			async authorize(credentials, req) {
				try {
					const token = await authSdk.login({ email: credentials.email, password: credentials.password });
					if ( !token ) return null;
					return token;
				} catch ( e ) {
					console.log(e);
					return null;
				}
			},
		}),
	],
	debug: true,
	callbacks: {
		async jwt(params) {// This user return by provider {} as you mentioned above MY CONTENT {token:}
			let { token, user, account, isNewUser } = params;

			if ( user ) {
				if ( user.access_token ) {
					token = { accessToken: user.access_token };
				}
			}
			return token;
		},

		// That token store in session
		async session(params) { // this token return above jwt()
			const { session, token } = params;
			session.accessToken = token.accessToken;
			//if you want to add user details info
			session.user = jwt_decode(token.accessToken);//this user info get via API call or decode token. Anything
			// you want you can add
			return session;
		},
	},
});

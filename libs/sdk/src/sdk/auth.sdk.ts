import { ILoginUserDto } from '@nima/interfaces';
import axios from 'axios';

export class AuthSdk {
	async login(data: ILoginUserDto): Promise<{ access_token: string }> {
		const res = await axios.post('http://localhost:3333/api/v1/auth/login', data);
		return res.data;
	}

	async getProfile() {
		const res = await axios.get('http://localhost:3333/api/v1/auth/profile');
		return res.data;
	}
}

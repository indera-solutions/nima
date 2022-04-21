import { ILoginUserDto } from '@nima/interfaces';
import axios from 'axios';

export class AuthSdk {
	async login(data: ILoginUserDto) {
		return axios.post('http://localhost:3333', data);
	}
}

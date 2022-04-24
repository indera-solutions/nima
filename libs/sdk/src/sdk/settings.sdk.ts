import { Settings } from '@nima/interfaces';
import axios from 'axios';

export class SettingsSdk {
	constructor() {
	}

	async createSettings(dto: Settings): Promise<Settings> {
		const res = await axios.post('http://localhost:3333/api/v1/core/settings', dto);
		return res.data;
	}

	async getSettings(): Promise<Settings> {
		const res = await axios.get('http://localhost:3333/api/v1/core/settings');
		return res.data;
	}

	async updateSettings(dto: Settings): Promise<Settings> {
		const res = await axios.put('http://localhost:3333/api/v1/core/settings', dto);
		return res.data;
	}
}

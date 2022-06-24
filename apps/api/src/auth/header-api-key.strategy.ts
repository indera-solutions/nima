import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

const API_KEY = process.env['NODE_ENV'] === 'prod' ? process.env['API_KEY'] : '12345';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
	constructor() {
		super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
			return this.validate(apiKey, done);
		});
	}

	public validate = (apiKey: string, done: (error: Error, data: any) => Record<string, unknown>) => {
		if ( API_KEY === apiKey ) done(null, true);
		done(new UnauthorizedException(), null);
	};
}

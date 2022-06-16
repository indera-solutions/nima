import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
	constructor() {
		super({ header: 'X-API-KEY', prefix: '' }, true, async (apiKey, done) => {
			return this.validate(apiKey, done);
		});
	}

	public validate = (apiKey: string, done: (error: Error, data: any) => Record<string, unknown>) => {
		if ( process.env['API_KEY'] === apiKey ) done(null, true);
		done(new UnauthorizedException(), null);
	};
}

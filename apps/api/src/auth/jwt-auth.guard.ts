import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { firstValueFrom, isObservable } from 'rxjs';
import { IS_PUBLIC_KEY } from './auth.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		const _res = super.canActivate(context);
		let res: boolean;
		try {
			if ( isObservable(_res) ) {
				res = await firstValueFrom(_res);
			} else {
				res = await _res;
			}
		} catch ( e ) {
			if ( e.status === 401 && isPublic ) return true;
			throw e;
		}
		return isPublic || res;
	}
}

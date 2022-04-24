import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ADMIN_KEY, LOGGED_IN_KEY, STAFF_KEY } from './auth.decorator';

@Injectable()
export class LoggedInGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const requireLoggedIn = this.reflector.getAllAndOverride<boolean>(LOGGED_IN_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if ( !requireLoggedIn ) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return !!user;
	}
}

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const requireAdmin = this.reflector.getAllAndOverride<boolean>(ADMIN_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if ( !requireAdmin ) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return user.isAdmin;
	}
}

@Injectable()
export class StaffGuard implements CanActivate {
	constructor(private reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const requireStaff = this.reflector.getAllAndOverride<boolean>(STAFF_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if ( !requireStaff ) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return user.isStaff;
	}
}


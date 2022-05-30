import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
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

@Injectable()
export class IsSelfGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {
	}

	canActivate(context: ExecutionContext): boolean {
		const { user } = context.switchToHttp().getRequest();
		if ( !user ) {
			throw new ForbiddenException('NO_CURRENT_USER_FOUND');
		}
		const paramField = this.reflector.get<string>('isSelfParam', context.getHandler());
		const bodyField = this.reflector.get<string>('isSelfBody', context.getHandler());
		const queryField = this.reflector.get<string>('isSelfQuery', context.getHandler());
		if ( !paramField && !bodyField && !queryField ) {
			throw new ForbiddenException('MISSING_IS_SELF_DECORATOR');
		}
		let value;
		if ( paramField ) value = context.switchToHttp().getRequest().params[paramField];
		else if ( bodyField ) value = context.switchToHttp().getRequest().body[bodyField];
		else if ( queryField ) value = context.switchToHttp().getRequest().query[queryField];
		if ( user.id !== value ) {
			throw new ForbiddenException('PROVIDED_FIELD_MISS_MATCH');
		}
		return true;
	}
}

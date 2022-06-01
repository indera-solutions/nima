import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const STAFF_KEY = 'STAFF';
export const ADMIN_KEY = 'ADMIN';
export const IS_SELF_KEY = 'IS_SELF';
export const IS_PUBLIC_KEY = 'IS_PUBLIC';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
export const IsStaff = () => SetMetadata(STAFF_KEY, true);
export const IsAdmin = () => SetMetadata(ADMIN_KEY, true);
export const IsSelf = () => SetMetadata(IS_SELF_KEY, true);

export const IsSelfParam = (field: string) => SetMetadata('isSelfParam', field);

export const IsSelfBody = (field: string) => SetMetadata('isSelfBody', field);

export const IsSelfQuery = (field: string) => SetMetadata('isSelfQuery', field);

export const User = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.user;
	},
);

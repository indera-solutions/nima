import { SetMetadata } from '@nestjs/common';

export const LOGGED_IN_KEY = 'LOGGED_IN';
export const STAFF_KEY = 'STAFF';
export const ADMIN_KEY = 'ADMIN';
export const IS_SELF_KEY = 'IS_SELF';

export const IsLoggedIn = () => SetMetadata(LOGGED_IN_KEY, true);
export const IsStaff = () => SetMetadata(STAFF_KEY, true);
export const IsAdmin = () => SetMetadata(ADMIN_KEY, true);
export const IsSelf = () => SetMetadata(IS_SELF_KEY, true);

export const IsSelfParam = (field: string) => SetMetadata('isSelfParam', field);

export const IsSelfBody = (field: string) => SetMetadata('isSelfBody', field);

export const IsSelfQuery = (field: string) => SetMetadata('isSelfQuery', field);

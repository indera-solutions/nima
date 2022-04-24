import { SetMetadata } from '@nestjs/common';

export const LOGGED_IN_KEY = 'LOGGED_IN';
export const STAFF_KEY = 'STAFF';
export const ADMIN_KEY = 'ADMIN';

export const IsLoggedIn = () => SetMetadata(LOGGED_IN_KEY, true);
export const IsStaff = () => SetMetadata(STAFF_KEY, true);
export const IsAdmin = () => SetMetadata(ADMIN_KEY, true);

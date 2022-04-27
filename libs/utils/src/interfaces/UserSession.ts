import { Metadata } from './Metadata';

export interface UserSession {
	id: number;
	email: string;
	isAdmin: boolean;
	isStaff: boolean;
	isActive: boolean;
	lastLogin?: string;
	metadata: Metadata;
	iat?: number;
	exp?: number;
}

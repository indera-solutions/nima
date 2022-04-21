import { Address, LanguageCode, Media, Metadata } from '../core';

export interface User {
	id: number;
	email: string;
	isAdmin: boolean;
	isStaff: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	lastLogin?: string;
	defaultBillingAddress?: Address;
	defaultShippingAddress?: Address;
	notes?: string;
	firstName?: string;
	lastName?: string;
	avatar?: Media;
	metadata: Metadata;
	privateMetadata: Metadata;
	languageCode: LanguageCode;
	addresses: Address[];
}

export interface UserSession extends Pick<User, 'id' | 'email' | 'isActive' | 'isAdmin' | 'isStaff' | 'lastLogin' | 'metadata'> {
}

export interface RegisterUserDto extends Pick<User, 'email' | 'firstName' | 'lastName'> {
	password: string;
}

export interface ILoginUserDto extends Pick<User, 'email'> {
	password: string;
}

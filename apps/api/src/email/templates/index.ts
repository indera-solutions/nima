import { AuthEmails } from './auth';
import { CommerceEmails } from './commerce';

export const Emails = { ...CommerceEmails, ...AuthEmails };
export type Emails = CommerceEmails | AuthEmails

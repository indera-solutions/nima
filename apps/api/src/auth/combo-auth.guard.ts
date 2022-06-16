import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class StaffOrKeyGuard extends AuthGuard(['api-key', 'staff-jwt']) {
}

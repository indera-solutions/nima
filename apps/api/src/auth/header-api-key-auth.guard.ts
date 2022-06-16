import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HeaderApiKeyAuthGuard extends AuthGuard('api-key') {
}

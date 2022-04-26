import { OmitType, PartialType } from '@nestjs/swagger';
import { CheckoutEntity } from '../entities/checkout.entity';

export class CheckoutDto extends CheckoutEntity {
}

export class CreateCheckoutDto extends OmitType(CheckoutDto, ['created', 'lastChange', 'token']) {
}

export class UpdateCheckoutDto extends PartialType(CreateCheckoutDto) {
}

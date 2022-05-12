import { OmitType } from '@nestjs/swagger';
import { AddressEntity } from '../entities/address.entity';

export class AddressDto extends AddressEntity {
}

export class CreateAddressDto extends OmitType(AddressDto, ['id']) {
}

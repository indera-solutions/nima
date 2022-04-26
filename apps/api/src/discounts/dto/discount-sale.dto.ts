import { OmitType, PartialType } from '@nestjs/swagger';
import { DiscountSaleEntity } from '../entities/discount-sale.entity';

export class DiscountSaleDto extends DiscountSaleEntity {
}

export class CreateDiscountSaleDto extends OmitType(DiscountSaleDto, ['id', 'created', 'updatedAt', 'categories', 'products']) {
}

export class UpdateDiscountDto extends PartialType(CreateDiscountSaleDto) {
}

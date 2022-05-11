import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { CheckoutEntity } from './checkout.entity';

@Entity('checkout_checkout_lines')
export class CheckoutLineEntity {
	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	quantity: number;

	@ManyToOne(() => CheckoutEntity, checkout => checkout.lines, { primary: true })
	checkout: CheckoutEntity;

	@ManyToOne(() => ProductVariantEntity, { primary: true })
	variant: ProductVariantEntity;
}

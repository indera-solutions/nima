import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariantDto } from '../../products/dto/product-variant.dto';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { CheckoutDto } from '../dto/checkout.dto';
import { CheckoutEntity } from './checkout.entity';

@Entity('checkout_checkout_lines')
export class CheckoutLineEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	quantity: number;

	@ManyToOne(() => CheckoutEntity)
	@ApiProperty({ type: CheckoutDto })
	checkout: CheckoutDto;

	@ManyToOne(() => ProductVariantEntity)
	@ApiProperty({ type: ProductVariantDto })
	variant: ProductVariantDto;
}

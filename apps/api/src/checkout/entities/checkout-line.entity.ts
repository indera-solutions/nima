import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { ProductVariantEntity } from '../../products/entities/product-variant.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { CheckoutEntity } from './checkout.entity';

@Entity('checkout_checkout_lines')
export class CheckoutLineEntity {
	@Column({ type: Number })
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	quantity: number;

	@ManyToOne(() => CheckoutEntity, checkout => checkout.lines, { primary: true })
	checkout: CheckoutEntity;

	@ManyToOne(() => ProductVariantEntity, { primary: true })
	variant: ProductVariantEntity;

	@RelationId((post: CheckoutLineEntity) => post.variant)
	@ApiProperty()
	@IsInt()
	variantId: number;

	@ManyToOne(() => ProductEntity, { eager: false })
	product: ProductEntity;

	@RelationId((post: CheckoutLineEntity) => post.product)
	@ApiProperty()
	productId: number;
}

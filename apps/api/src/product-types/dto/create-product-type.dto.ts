import { ApiProperty } from '@nestjs/swagger';
import { ICreateProductTypeDto, Metadata } from '@nima/interfaces';

export class CreateProductTypeDto implements ICreateProductTypeDto {
	@ApiProperty({ example: false })
	hasVariants: boolean;

	@ApiProperty({ example: false })
	isDigital: boolean;

	@ApiProperty({ example: false })
	isShippingRequired: boolean;

	@ApiProperty({ example: {} })
	metadata: Metadata;

	@ApiProperty({ example: 'Product Type' })
	name: string;

	@ApiProperty({ example: {} })
	privateMetadata: Metadata;

	@ApiProperty({ example: 'product-type' })
	slug: string;

	@ApiProperty({ example: 22.1 })
	weight: number;
}

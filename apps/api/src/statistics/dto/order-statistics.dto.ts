import { ApiProperty } from '@nestjs/swagger';

export class OrderStatisticsDto {
	@ApiProperty()
	startDate: string;

	@ApiProperty()
	endDate: string;

	@ApiProperty()
	totalPrice: number;

	@ApiProperty()
	averagePrice: number;

	@ApiProperty()
	totalOrderCount: number;

	@ApiProperty()
	totalProductCount: number;

	@ApiProperty()
	totalReturnCost: number;

	@ApiProperty()
	totalShippingCost: number;

	@ApiProperty()
	totalDiscountFromVouchers: number;

	@ApiProperty()
	totalVoucherUses: number;
}

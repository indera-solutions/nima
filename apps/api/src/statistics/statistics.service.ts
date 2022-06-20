import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../order/entities/order.entity';
import { OrderStatisticsDto } from './dto/order-statistics.dto';
import { StatisticsGrouping } from './dto/statistics.enum';

@Injectable()
export class StatisticsService {
	constructor(
		@InjectRepository(OrderEntity)
		private orderEntityRepository: Repository<OrderEntity>,
	) {
	}

	private static groupingToSqlField(grouping: StatisticsGrouping) {
		switch ( grouping ) {
			case StatisticsGrouping.DAY:
				return 'day';
			case StatisticsGrouping.WEEK:
				return 'week';
			case StatisticsGrouping.MONTH:
				return 'month';
			case StatisticsGrouping.QUARTER:
				return 'quarter';
			case StatisticsGrouping.YEAR:
				return 'year';
			case StatisticsGrouping.ALL_TIME:
				return 'millennium';
			default:
				return 'millennium';
		}
	}

	async generateOrderStats(startDate?: string, endDate?: string, grouping = StatisticsGrouping.DAY): Promise<OrderStatisticsDto> {

		const query = await this.orderEntityRepository
								.createQueryBuilder('o')
								.select(`date_trunc('${ StatisticsService.groupingToSqlField(grouping) }', o.created::TIMESTAMP WITH TIME ZONE) AS _group`);

		return {
			endDate: '',
			startDate: '',
			averagePrice: 0,
			totalOrderCount: 0,
			totalDiscountFromVouchers: 0,
			totalPrice: 0,
			totalProductCount: 0,
			totalReturnCost: 0,
			totalShippingCost: 0,
			totalVoucherUses: 0,
		};
	}
}

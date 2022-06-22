import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '../order/dto/order.enum';
import { OrderLineEntity } from '../order/entities/order-line.entity';
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

	async generateOrderStats(startDate?: string, endDate?: string, grouping = StatisticsGrouping.DAY): Promise<OrderStatisticsDto[]> {

		const fQuery = await this.orderEntityRepository
								 .createQueryBuilder('o')
								 .select(`date_trunc('${ StatisticsService.groupingToSqlField(grouping) }', o.created::TIMESTAMP WITH TIME ZONE) AS _group`)
								 .addSelect(`sum(o."totalGrossAmount")`, `totalFulfilledAmount`)
								 .addSelect(`avg(o."totalGrossAmount")`, `avgFulfilledAmount`)
								 .addSelect('count(o.id)', `totalOrderCount`)
								 .addSelect('sum(ol."productCount")', `totalProductCount`)
								 .addSelect('sum("totalDiscount")', `totalVoucherDiscount`)
								 .addSelect('sum("shippingCostDiscount")', `totalShippingCostDiscount`)
								 .addSelect('sum("shippingPriceGrossAmount")', `totalShippingCost`)
								 .addSelect('sum(CASE when "voucherCode" IS NOT NULL THEN 1 ELSE 0 END)', `totalVoucherUses`)
								 .leftJoin(qb => {
									 return qb
										 .select('sum(quantity)', 'productCount')
										 .addSelect('"orderId"')
										 .from(OrderLineEntity, 'ol')
										 .groupBy('"orderId"');
								 }, 'ol', 'ol."orderId" = o.id')
								 .where(`o.status = '${ OrderStatus.FULFILLED }'`)
								 .groupBy('_group');

		const res = await fQuery.getRawMany();
		console.log(res);

		return res.map(r => ({
			endDate: '',
			startDate: '',
			averagePrice: r['avgFulfilledAmount'],
			totalOrderCount: r['totalOrderCount'],
			totalDiscountFromVouchers: r['totalVoucherDiscount'],
			totalPrice: r['totalFulfilledAmount'],
			totalProductCount: r['totalProductCount'],
			totalReturnCost: 0,
			totalShippingCost: r['totalShippingCost'],
			totalVoucherUses: r['totalVoucherUses'],
		}));
	}
}

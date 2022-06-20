import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { OrderStatisticsDto } from './dto/order-statistics.dto';
import { StatisticsGrouping } from './dto/statistics.enum';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
@ApiTags('Statistics')
@ApiBearerAuth()
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {
	}

	@Get('order')
	@ApiOkResponse({ type: OrderStatisticsDto })
	@ApiQuery({ type: String, name: 'startDate', required: false })
	@ApiQuery({ type: String, name: 'endDate', required: false })
	@ApiQuery({ enum: StatisticsGrouping, enumName: 'StatisticsGrouping', name: 'grouping', required: false })
	findOne(
		@Query('startDate') startDate?: string,
		@Query('endDate') endDate?: string,
		@Query('grouping') grouping?: StatisticsGrouping,
	) {
		return this.statisticsService.generateOrderStats(startDate, endDate, grouping);
	}
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsModuleEntities } from '../discounts/discounts.module';
import { OrderModuleEntities } from '../order/order.module';
import { ProductsModuleEntities } from '../products/products.module';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
	imports: [TypeOrmModule.forFeature([...OrderModuleEntities, ...ProductsModuleEntities, ...DiscountsModuleEntities])],
	controllers: [StatisticsController],
	providers: [StatisticsService],
})
export class StatisticsModule {
}

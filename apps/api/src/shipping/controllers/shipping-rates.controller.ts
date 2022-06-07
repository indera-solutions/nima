import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IsStaff } from '../../auth/auth.decorator';
import { CreateShippingRateDto, ShippingRateDto, UpdateShippingRateDto } from '../dto/shipping-rate.dto';
import { ShippingService } from '../shipping.service';


@Controller('shipping/:methodId/zones/:zoneId/rates')
@ApiTags('Shipping')
@ApiBearerAuth()
export class ShippingRatesController {
	constructor(private readonly shippingService: ShippingService) {
	}

	@Post('')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiParam({ type: Number, name: 'zoneId' })
	@ApiCreatedResponse({ type: () => ShippingRateDto })
	@ApiBody({ type: () => CreateShippingRateDto })
	@IsStaff()
	async createRate(@Param('methodId') methodId: number, @Param('zoneId') zoneId: number, @Body() dto: CreateShippingRateDto): Promise<ShippingRateDto> {
		const res = await this.shippingService.createRate({
			dto: dto,
			methodId: methodId,
			zoneId: zoneId,
		});
		return ShippingRateDto.prepare(res);
	}

	@Patch(':id')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiParam({ type: Number, name: 'zoneId' })
	@ApiParam({ type: Number, name: 'id' })
	@ApiBody({ type: () => UpdateShippingRateDto })
	@ApiCreatedResponse({ type: () => ShippingRateDto })
	@IsStaff()
	async updateRate(
		@Param('methodId') methodId: number,
		@Param('zoneId') zoneId: number,
		@Param('id') id: number,
		@Body() dto: UpdateShippingRateDto,
	): Promise<ShippingRateDto> {
		const res = await this.shippingService.updateRate({
			dto,
			id,
			methodId,
			zoneId,
		});
		return ShippingRateDto.prepare(res);
	}

	@Delete(':id')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiParam({ type: Number, name: 'zoneId' })
	@ApiParam({ type: Number, name: 'id' })
	@ApiCreatedResponse({ type: () => ShippingRateDto })
	@IsStaff()
	async deleteRate(
		@Param('methodId') methodId: number,
		@Param('zoneId') zoneId: number,
		@Param('id') id: number,
	): Promise<ShippingRateDto> {
		const res = await this.shippingService.deleteRate({
			id,
			methodId,
			zoneId,
		});
		return ShippingRateDto.prepare(res);
	}

}

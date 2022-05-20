import { Body, Controller, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateShippingZoneDto, ShippingZoneDto, UpdateShippingZoneDto } from '../dto/shipping-zone.dto';
import { ShippingService } from '../shipping.service';


@Controller('shipping/:methodId/zones')
@ApiTags('Shipping')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ShippingZonesController {
	constructor(private readonly shippingService: ShippingService) {
	}

	@Post('')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiCreatedResponse({ type: () => ShippingZoneDto })
	@ApiBody({ type: () => CreateShippingZoneDto })
	async createZone(@Param('methodId', ParseIntPipe) methodId: number, @Body() dto: CreateShippingZoneDto) {
		const res = await this.shippingService.createZone({ dto: dto, methodId: methodId });
		return ShippingZoneDto.prepare(res);
	}

	@Patch(':id')
	@ApiParam({ type: Number, name: 'methodId' })
	@ApiParam({ type: Number, name: 'id' })
	@ApiCreatedResponse({ type: () => ShippingZoneDto })
	@ApiBody({ type: () => UpdateShippingZoneDto })
	async updateZone(@Param('id', ParseIntPipe) zoneId: number, @Body() dto: UpdateShippingZoneDto) {
		const res = await this.shippingService.updateZone({ dto: dto, id: zoneId });
		return ShippingZoneDto.prepare(res);
	}

}
